import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { StudentsComponent } from './students/students.component';
import { StudentsTableComponent, AddStudentDialog, UpdateStudentDialog } from './students/students-table/students-table.component';

import { TeachersComponent } from './teachers/teachers.component';
import { TeachersTableComponent, AddTeacherDialog, UpdateTeacherDialog } from './teachers/teachers-table/teachers-table.component';
import { TeachersEnrollmentComponent, AddTeachersEnrollmentDialog, UpdateTeachersEnrollmentDialog } from './teachers/teachers-enrollment/teachers-enrollment.component';

import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsTableComponent, AddSubjectDialog, UpdateSubjectDialog } from './subjects/subjects-table/subjects-table.component';
import { SubjectsEnrollmentComponent, AddSubjectsEnrollmentDialog } from './subjects/subjects-enrollment/subjects-enrollment.component';

import { CoursesComponent } from './courses/courses.component';
import { CoursesTableComponent, AddCourseDialog, UpdateCourseDialog, ViewCourseDialog } from './courses/courses-table/courses-table.component';


//Imorts de la tabla
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';
import { StudentsEnrollmentComponent, AddStudentsEnrollmentDialog, UpdateStudentsEnrollmentDialog } from './students/students-enrollment/students-enrollment.component';

//Services
import { LoggingService } from './LoggingService.service';
import { DataServices } from './data.service';
import { StudentsService } from './students/student.service';
import { TeachersService } from './teachers/teacher.service';
import { SubjectsService } from './subjects/subject.service';
import { CoursesService } from './courses/course.service';
import { ThemeService } from './theme.service';
import { HorarioService } from './horario.service';

//Calendar
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';

//login
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,

    StudentsComponent,
    StudentsTableComponent,
    AddStudentDialog,
    UpdateStudentDialog,
    StudentsEnrollmentComponent,
    AddStudentsEnrollmentDialog,
    UpdateStudentsEnrollmentDialog,

    MainMenuComponent,
    HeaderComponent,

    TeachersComponent,
    TeachersTableComponent,
    AddTeacherDialog,
    UpdateTeacherDialog,
    TeachersEnrollmentComponent,
    AddTeachersEnrollmentDialog,
    UpdateTeachersEnrollmentDialog,

    SubjectsComponent,
    SubjectsTableComponent,
    AddSubjectDialog,
    UpdateSubjectDialog,
    SubjectsEnrollmentComponent,
    AddSubjectsEnrollmentDialog,

    CoursesComponent,
    CoursesTableComponent,
    AddCourseDialog,
    UpdateCourseDialog,
    ViewCourseDialog,

    LoginComponent,
    LoginFormComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule, ScheduleModule, RecurrenceEditorModule
  ],
  providers: [
  LoggingService,
  DataServices,
  StudentsService,
  TeachersService,
  SubjectsService,
  CoursesService,
  ThemeService,
  HorarioService,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);