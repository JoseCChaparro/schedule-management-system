import { LoggingService } from '../LoggingService.service';
import { Course } from './course.model';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class CoursesService {
    courses: Course[] = [];

    saludar = new EventEmitter<number>();

    constructor(private loggingService: LoggingService) {
      this.courses.push({
        selected: false,
        id: "1",
        subject: "Seminario de investigacion",
        teacher: "Vania Alvarez",
        career: "ICC",
        semester: "8",
        students_quantity: "12",
        salon: "20",
        mondayHours: ["13:00"],
        tuesdayHours: [],
        wednesdayHours: [],
        thursdayHours: [],
        fridayHours: ["08:00"],
        saturdayHours: [],
        sundayHours: [],
    });
    this.courses.push({
      selected: false,
      id: "2",
      subject: "Ingenieria de Software",
      teacher: "Perla Cordero",
      career: "ICC",
      semester: "8",
      students_quantity: "12",
      salon: "20",
      mondayHours: ["12:00"],
      tuesdayHours: [],
      wednesdayHours: ["10:00"],
      thursdayHours: ["10:00"],
      fridayHours: [],
      saturdayHours: [],
      sundayHours: [],
  });
  this.courses.push({
    selected: false,
    id: "2",
    subject: "User Experience",
    teacher: "Adrían Alarcón",
    career: "ICC",
    semester: "8",
    students_quantity: "7",
    salon: "lab-5",
    mondayHours: ["09:00", "10:00"],
    tuesdayHours: ["08:00"],
    wednesdayHours: [],
    thursdayHours: ["14:00"],
    fridayHours: [],
    saturdayHours: [],
    sundayHours: [],
  });
  this.courses.push({
    selected: false,
    id: "3",
    subject: "Computo paralelo y Distribuido",
    teacher: "José De Lira",
    career: "ICC",
    semester: "8",
    students_quantity: "21",
    salon: "lab-5",
    mondayHours: [],
    tuesdayHours: [],
    wednesdayHours: ["08:00", "09:00"],
    thursdayHours: ["08:00", "09:00"],
    fridayHours: [],
    saturdayHours: [],
    sundayHours: [],
  });
  this.courses.push({
    selected: false,
    id: "4",
    subject: "Seminario de investigacion II",
    teacher: "Vania Alvarez",
    career: "ICC",
    semester: "9",
    students_quantity: "11",
    salon: "15",
    mondayHours: [],
    tuesdayHours: ["12:00", "13:00"],
    wednesdayHours: [],
    thursdayHours: [],
    fridayHours: [],
    saturdayHours: [],
    sundayHours: [],
});
this.courses.push({
  selected: false,
  id: "4",
  subject: "Ingeniería de software I",
  teacher: "Vania Alvarez",
  career: "ICC",
  semester: "7",
  students_quantity: "22",
  salon: "lab-4",
  mondayHours: [],
  tuesdayHours: ["11:00"],
  wednesdayHours: ["11:00"],
  thursdayHours: ["11:00"],
  fridayHours: [],
  saturdayHours: [],
  sundayHours: [],
});
    console.log(this.courses[0]);
    }

    addCourse(course: Course) {
        //this.loggingService.sendMessageToConsole("agregamos Student: " + student.name + " " + student.surname);
        this.courses.push(course);
        //this.dataService.guardarPersonas(this.students);
    }

    findCourse(id: string) {
        const index = this.courses.findIndex(course => course.id === id);
        let course: Course = this.courses[index];
        return course;
    }

    updateCourse(course: Course) {
        if (course != null) {
            //console.log("Student que llega a update en servicio",student.id);
            const index = this.courses.findIndex(course1 => course1.id === course.id);
            //console.log("este es el index pa",index);
            //console.log("Student a modificar",this.students[index]);
            this.courses[index] = course;
        }
    }

    deleteCourse(id: string) {
        const index = this.courses.findIndex(course => course.id === id);
        this.courses.splice(index, 1);
    }
}

