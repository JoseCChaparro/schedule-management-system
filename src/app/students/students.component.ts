import { Component } from '@angular/core';
import { Student } from './student.model';
import { StudentsService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  title: string = "Alumnos";

  constructor() { }



}
