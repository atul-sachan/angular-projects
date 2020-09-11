import { CourseDialogComponent } from './../course-dialog/course-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-course-list-cards',
  templateUrl: './course-list-cards.component.html',
  styleUrls: ['./course-list-cards.component.scss']
})
export class CourseListCardsComponent implements OnInit {

  @Input() courses: Course[];
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModalForEdit(course: Course): void{
    console.log(course.description);
    const initialState = {
      course
    };
    this.bsModalRef = this.modalService.show(CourseDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.event.subscribe(res => {
      //this.courses.push(res.data);
      console.log(res);
   });
  }

}
