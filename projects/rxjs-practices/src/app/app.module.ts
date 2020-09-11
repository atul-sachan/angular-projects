import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CustomTabsModule } from 'custom-tabs';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseListCardsComponent } from './course-list-cards/course-list-cards.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseSearchComponent } from './course-search/course-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CourseComponent,
    NavbarComponent,
    CourseListCardsComponent,
    CourseDialogComponent,
    CourseSearchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    // CustomTabsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[CourseDialogComponent] // ,
  // schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
