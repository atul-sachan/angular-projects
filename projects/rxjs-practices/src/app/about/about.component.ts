import { Component, OnInit } from '@angular/core';
import { Observable, noop } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const http$ = Observable.create(observer => {
      fetch('/api/courses')
        .then(response => {
          return response.json();
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });

    const course$ = http$.pipe(
      map(res => Object.values(res['payload']))
    );

    course$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }

}
