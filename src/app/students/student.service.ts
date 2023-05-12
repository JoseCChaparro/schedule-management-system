import { LoggingService } from '../LoggingService.service';
//import { DataServices } from '../data.service';
import { Student } from './student.model';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class StudentsService {
    students: Student[] = [];

    saludar = new EventEmitter<number>();

    constructor(private loggingService: LoggingService) {
        for (let i = 1; i <= 4; i++) {
            this.students.push(createNewStudent(i));
        }

    }

    addStudent(student: Student) {
        this.loggingService.sendMessageToConsole("agregamos Student: " + student.name + " " + student.surname);
        this.students.push(student);
        //this.dataService.guardarPersonas(this.students);
    }

    findStudent(id: string) {
        const index = this.students.findIndex(student => student.id === id);
        let student: Student = this.students[index];
        return student;
    }

    updateStudent(student: Student) {
        if (student != null) {
            //console.log("Student que llega a update en servicio",student.id);
            const index = this.students.findIndex(student1 => student1.id === student.id);
            //console.log("este es el index pa",index);
            //console.log("Student a modificar",this.students[index]);
            this.students[index] = student;
        }
    }

    deleteStudent(id: string) {
        const index = this.students.findIndex(student => student.id === id);
        this.students.splice(index, 1);
    }
}

/** Builds and returns a new User. */
function createNewStudent(id: number): Student {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    const surname =
        SURNAMES[Math.round(Math.random() * (SURNAMES.length - 1))] + ' ' +
        SURNAMES[Math.round(Math.random() * (SURNAMES.length - 1))];
    const course = COURSES[Math.round(Math.random() * (COURSES.length - 1))];
    let estatus = Math.round(Math.random() * (STATUS.length - 1));
    return {
        selected: false,
        id: id.toString(),
        name: name,
        surname: surname,
        status: STATUS[estatus],
        color: COLORS[estatus],
        course: course
    };
}

const COLORS = ['red', 'green'];
const STATUS = ['no inscrito', 'inscrito'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
const SURNAMES = ['García', 'Martínez', 'Hernández', 'López', 'González', 'Pérez',
    'Sánchez', 'Rodríguez', 'Romero', 'Suárez', 'Díaz', 'Flores', 'Ruiz',
    'Torres', 'Álvarez', 'Vargas', 'Fernández', 'Jiménez', 'Moreno', 'Cruz'];
const COURSES = ['Ing. Mecánica', 'Lic. Psicología', 'Ing. Electrónica',
    'Lic. Administración', 'Ing. Civil', 'Lic. Derecho', 'Ing. Informática', 'Lic. Contabilidad'];
