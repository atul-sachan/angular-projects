import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Course } from '../models/course';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {

  course: any = {};
  public event: EventEmitter<string> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    console.log(this.course);
  }

  returnToParent(): void{
    this.event.emit('Hello');
    this.bsModalRef.hide();
  }

}
