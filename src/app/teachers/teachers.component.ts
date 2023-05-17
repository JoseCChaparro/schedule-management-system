import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent {
  titulo: string = "Maestros";
  background: ThemePalette = undefined;

  constructor() { }

}
