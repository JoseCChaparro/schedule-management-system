import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { StudentsTableComponent, AddStudentDialog, UpdateStudentDialog } from './students/students-table/students-table.component';
import { TeachersTableComponent, AddTeacherDialog, UpdateTeacherDialog } from './teachers-table/teachers-table.component';
import { SubjectsTableComponent, AddSubjectDialog, UpdateSubjectDialog } from './subjects-table/subjects-table.component';

//Imorts de la tabla
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';
import { StudentsEnrollmentComponent, AddStudentsEnrollmentDialog } from './students/students-enrollment/students-enrollment.component';



@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsTableComponent,
    AddStudentDialog,
    UpdateStudentDialog,
    MainMenuComponent,
    HeaderComponent,
    TeachersTableComponent,
    AddTeacherDialog,
    UpdateTeacherDialog,
    SubjectsTableComponent,
    AddSubjectDialog,
    UpdateSubjectDialog,

    StudentsEnrollmentComponent,
    AddStudentsEnrollmentDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);