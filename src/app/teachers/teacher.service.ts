import { LoggingService } from '../LoggingService.service';
//import { DataServices } from '../data.service';
import { Teacher } from './teacher.model';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class TeachersService {
    teachers: Teacher[] = [];

    saludar = new EventEmitter<number>();

    constructor(private loggingService: LoggingService) {
        for (let i = 1; i <= 7; i++) {
            this.teachers.push(createNewTeacher(i));
        }

    }

    addTeacher(teacher: Teacher) {
        this.loggingService.sendMessageToConsole("agregamos Teacher: " + teacher.name + " " + teacher.surname);
        this.teachers.push(teacher);
        //this.dataService.guardarPersonas(this.students);
    }

    findTeacher(id: string) {
        const index = this.teachers.findIndex(teacher => teacher.id === id);
        let teacher: Teacher = this.teachers[index];
        return teacher;
    }

    updateTeacher(teacher: Teacher) {
        if (teacher != null) {
            //console.log("Student que llega a update en servicio",student.id);
            const index = this.teachers.findIndex(teacher1 => teacher1.id === teacher.id);
            //console.log("este es el index pa",index);
            //console.log("Student a modificar",this.students[index]);
            this.teachers[index] = teacher;
        }
    }

    deleteTeacher(id: string) {
        const index = this.teachers.findIndex(teacher => teacher.id === id);
        this.teachers.splice(index, 1);
    }
}

/** Builds and returns a new User. */
function createNewTeacher(id: number): Teacher {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    const surname =
        SURNAMES[Math.round(Math.random() * (SURNAMES.length - 1))] + ' ' +
        SURNAMES[Math.round(Math.random() * (SURNAMES.length - 1))];
    //const course = COURSES[Math.round(Math.random() * (COURSES.length - 1))];
    //let estatus = Math.round(Math.random() * (STATUS.length - 1));
    return {
        selected: false,
        id: id.toString(),
        name: name,
        surname: surname
    };
}

const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
const SURNAMES = ['García', 'Martínez', 'Hernández', 'López', 'González', 'Pérez',
    'Sánchez', 'Rodríguez', 'Romero', 'Suárez', 'Díaz', 'Flores', 'Ruiz',
    'Torres', 'Álvarez', 'Vargas', 'Fernández', 'Jiménez', 'Moreno', 'Cruz'];
