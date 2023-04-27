import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsTableComponent } from './students-table/students-table.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { TeachersTableComponent } from './teachers-table/teachers-table.component';
import { SubjectsTableComponent } from './subjects-table/subjects-table.component';

const routes: Routes = [
  { path: "", component: MainMenuComponent },
  { path: "alumnos", component: StudentsTableComponent },
  { path: "maestros", component: TeachersTableComponent},
  { path: "materias", component: SubjectsTableComponent},
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
