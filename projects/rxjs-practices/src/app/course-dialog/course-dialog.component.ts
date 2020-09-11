import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { concatMap, exhaustMap, filter, mergeMap } from 'rxjs/operators';
import { Course } from '../models/course';
import { fromPromise } from 'rxjs/internal-compatibility';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;
  form: FormGroup;
  course: any = {};

  public event: EventEmitter<Course> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.course.description, Validators.required],
      category: [this.course.category, Validators.required],
      // releasedAt: [moment(), Validators.required],
      longDescription: [this.course.longDescription, Validators.required]
    });
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        concatMap(changes => this.saveCourse(changes))
        // mergeMap(changes => this.saveCourse(changes))
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(
        exhaustMap(() => this.saveCourse(this.form.value))
      )
      .subscribe();
  }


  saveCourse(changes): Observable<any> {
    console.log(changes);
    return fromPromise(
      fetch(`/api/courses/${this.course.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...this.course, ...changes }),
        headers: {
          'content-type': 'application/json'
        }
      })
    );
  }


  returnToParent(): void {
    this.event.emit(this.form.value);
    this.bsModalRef.hide();
  }

  save(): void {
    console.log(this.form.value);
  }

  close(): void {
    this.bsModalRef.hide();
  }

}
