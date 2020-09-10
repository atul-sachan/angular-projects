import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListCardsComponent } from './course-list-cards.component';

describe('CourseListCardsComponent', () => {
  let component: CourseListCardsComponent;
  let fixture: ComponentFixture<CourseListCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
