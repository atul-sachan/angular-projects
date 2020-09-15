import { Component, OnInit } from '@angular/core';
import { noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, concat, delayWhen, finalize, map, retryWhen, shareReplay, take } from 'rxjs/operators';
import { createHttpObservable } from '../util';
import { Course } from '../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  intermediateCourses$: Observable<Course[]>;
  advanceCourses$: Observable<Course[]>;


  // beginnerCourses: Course[] = [];
  // intermediateCourses: Course[] = [];
  // advanceCourses: Course[] = [];
  tabpanel = 0;
  constructor() { }

  ngOnInit(): void {
    const http$: Observable<Course[]> = createHttpObservable('/api/courses').pipe(
      catchError(err => {
        console.log('Error Occured', err);
        return throwError(err);
      }),
      finalize(() => {
        console.log('Finalize Excuted');
      }),
      // catchError(err => of([]))
      // tslint:disable-next-line: no-string-literal
      map(res => Object.values(res['payload'])),
      shareReplay<Course[]>(),
      retryWhen(error => error.pipe(
        delayWhen(() => timer(2000))
      ))
    );
    this.beginnerCourses$ = http$.pipe(
      map((courses: Course[]) => courses.filter((course: Course) => course.category === 'BEGINNER'))
    );

    this.intermediateCourses$ = http$.pipe(
      map((courses: Course[]) => courses.filter((course: Course) => course.category === 'INTERMEDIATE'))
    );

    this.advanceCourses$ = http$.pipe(
      map((courses: Course[]) => courses.filter((course: Course) => course.category === 'ADVANCED'))
    );

    // const course$ = http$.pipe(
    //   map(res => Object.values(res['payload']))
    // );

    // course$.subscribe(
    //   (courses: Course[]) => {
    //     this.beginnerCourses = courses.filter(course => course.category === 'BEGINNER');
    //     this.intermediateCourses = courses.filter(course => course.category === 'INTERMEDIATE');
    //     this.advanceCourses = courses.filter(course => course.category === 'ADVANCED');
    //   },
    //   noop,
    //   () => console.log('completed')
    // );
  }

  onSelect(value: number): void {
    this.tabpanel = value;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {

  }
}
