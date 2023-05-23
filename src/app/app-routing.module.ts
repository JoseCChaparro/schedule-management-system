import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { CoursesComponent } from './courses/courses.component';

import { StudentUserComponent } from './student-user/student-user.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "admin-menu", component: MainMenuComponent },
  { path: "alumnos", component: StudentsComponent },
  { path: "maestros", component: TeachersComponent},
  { path: "materias", component: SubjectsComponent},
  { path: "cursos", component: CoursesComponent},
  { path: "alumno", component: StudentUserComponent},
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
