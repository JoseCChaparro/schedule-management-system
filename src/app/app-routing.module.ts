import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SubjectsTableComponent } from './subjects-table/subjects-table.component';

const routes: Routes = [
  { path: "", component: MainMenuComponent },
  { path: "alumnos", component: StudentsComponent },
  { path: "maestros", component: TeachersComponent},
  { path: "materias", component: SubjectsTableComponent},
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
