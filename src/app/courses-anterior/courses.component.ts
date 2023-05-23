import { Component, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent {
  title: string = "Cursos";
  background: ThemePalette = undefined;

}
