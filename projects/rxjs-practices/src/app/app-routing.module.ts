import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { AboutComponent } from './about/about.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'course'},
  { path: 'course', component: CourseComponent },
  { path: 'course/edit', component: CourseDialogComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
