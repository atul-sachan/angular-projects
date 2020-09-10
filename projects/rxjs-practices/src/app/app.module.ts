import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CustomTabsModule } from 'custom-tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseListCardsComponent } from './course-list-cards/course-list-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CourseComponent,
    NavbarComponent,
    CourseListCardsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CustomTabsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
