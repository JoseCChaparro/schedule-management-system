import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  title: string = "Alumnos";
  background: ThemePalette = undefined;

  constructor() { }

}
