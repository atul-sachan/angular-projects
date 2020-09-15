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
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from '../debug';

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
    this.course$ = createHttpObservable(`/api/courses/${courseId}`).pipe(
      debug(RxJsLoggingLevel.INFO, 'course value '),
    );
    setRxJsLoggingLevel(RxJsLoggingLevel.TRACE);
  }

  ngAfterViewInit(): void {
    // const searchLesson$ = fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     map((event: Event) => (event.target as HTMLInputElement).value),
    //     debounceTime(500),
    //     distinctUntilChanged(),
    //     switchMap(search => this.loadLessons(search))
    //   );

    // const initialLesson$ = this.loadLessons();
    // this.lessons$ = concat(initialLesson$, searchLesson$);

    this.lessons$ = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        startWith(''),
        debug( RxJsLoggingLevel.TRACE, 'search '),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(search => this.loadLessons(search)),
        debug( RxJsLoggingLevel.DEBUG, 'lessons value ')
      );

  }

  loadLessons(search = ''): Observable<Lesson[]> {
    // tslint:disable-next-line: no-string-literal
    const courseId = this.route.snapshot.params['id'];
    return createHttpObservable(`/api/lessons?courseId=${courseId}&pageSize=100&filter=${search}`)
      .pipe(
        // tslint:disable-next-line: no-string-literal
        map(res => Object.values(res['payload']))
      );

  }

}
