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
        career: "icc",
        semester: "8",
        students_quantity: "12",
        salon: "20"
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

