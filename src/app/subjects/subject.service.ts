import { LoggingService } from '../LoggingService.service';
import { Subject } from '../subjects/subject.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SubjectsService{
    subjects: Subject[] = [];

    saludar = new EventEmitter<number>();

    constructor(private loggingService: LoggingService) {
        // Create 100 users

        for (let i = 1; i <= 100; i++) { 
            this.subjects.push(createNewUser(i)); 
        }
    }

    addSubject(subject: Subject) {
        this.loggingService.sendMessageToConsole("agregamos Subject: " + subject.name);
        this.subjects.push(subject);
    }

    findSubject(id: string) {
        const index = this.subjects.findIndex(subject => subject.id === id);
        let subject: Subject = this.subjects[index];
        return subject;
    }

    updateSubject(subject: Subject) {
        if (subject != null) {
            const index = this.subjects.findIndex(subject1 => subject1.id === subject.id);
            this.subjects[index] = subject;
        }
    }

    deleteSubject(id: string) {
        const index = this.subjects.findIndex(subject => subject.id === id);
        this.subjects.splice(index, 1);
    }

    getCourses(){
        return passCourses();
    }
}

function passCourses(): string[] {
    return COURSES;
}

/** Builds and returns a new User. */
function createNewUser(id: number): Subject {
    const name =
      COURSES[Math.round(Math.random() * (COURSES.length - 1))] + ' ' +
      COURSES[Math.round(Math.random() * (COURSES.length - 1))].charAt(0) + '.';
    const credits = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
    const course = [COURSES[Math.round(Math.random() * (COURSES.length - 1))], COURSES[Math.round(Math.random() * (COURSES.length - 1))]];
    
    return {
        id: id.toString(),
        name: name,
        credits: credits,
        requirements: course,
        selected: false
    };
  }

/** Constants used to fill up our data base. */

  const COURSES = [
    'Cálculo I',
    'Álgebra Lineal',
    'Introducción a la Programación',
    'Estructuras de Datos',
    'Teoría de Sistemas',
    'Ingeniería de Software',
    'Física Moderna',
    'Química Orgánica',
    'Psicología Social',
    'Psicología del Desarrollo',
    'Marketing Estratégico',
    'Finanzas Corporativas',
    'Derecho Mercantil',
    'Derecho Penal',
    'Contabilidad Financiera',
    'Contabilidad de Costos'
  ];