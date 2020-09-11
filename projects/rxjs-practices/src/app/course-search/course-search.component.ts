import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, timeInterval
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat, pipe } from 'rxjs';
import { Course } from '../models/course';
import { Lesson } from '../models/lesson';
import { createHttpObservable } from '../util';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit, AfterViewInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild('searchInput', { static: true }) input: ElementRef;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    const courseId = this.route.snapshot.params['id'];
    this.course$ = createHttpObservable(`/api/courses/${courseId}`);
    
  }

  ngAfterViewInit(): void {
    const searchLesson$ = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(search => this.loadLessons(search))
      );

    const initialLesson$ = this.loadLessons();
    this.lessons$ = concat(initialLesson$, searchLesson$);
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    const courseId = this.route.snapshot.params['id'];
    return createHttpObservable(`/api/lessons?courseId=${courseId}&pageSize=100&filter=${search}`)
      .pipe(
        map(res => Object.values(res['payload']))
      );

  }

}