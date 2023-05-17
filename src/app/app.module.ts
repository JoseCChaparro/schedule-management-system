import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { StudentsComponent } from './students/students.component';
import { StudentsTableComponent, AddStudentDialog, UpdateStudentDialog } from './students/students-table/students-table.component';

import { TeachersComponent } from './teachers/teachers.component';
import { TeachersTableComponent, AddTeacherDialog, UpdateTeacherDialog } from './teachers/teachers-table/teachers-table.component';
import { TeachersEnrollmentComponent, AddTeachersEnrollmentDialog } from './teachers/teachers-enrollment/teachers-enrollment.component';

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

//Services
import { LoggingService } from './LoggingService.service';
import { DataServices } from './data.service';
import { StudentsService } from './students/student.service';
import { TeachersService } from './teachers/teacher.service';



@NgModule({
  declarations: [
    AppComponent,

    StudentsComponent,
    StudentsTableComponent,
    AddStudentDialog,
    UpdateStudentDialog,
    StudentsEnrollmentComponent,
    AddStudentsEnrollmentDialog,

    MainMenuComponent,
    HeaderComponent,

    TeachersComponent,
    TeachersTableComponent,
    AddTeacherDialog,
    UpdateTeacherDialog,
    TeachersEnrollmentComponent,
    AddTeachersEnrollmentDialog,    

    SubjectsTableComponent,
    AddSubjectDialog,
    UpdateSubjectDialog,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
  LoggingService,
  DataServices,
  StudentsService,
  TeachersService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);