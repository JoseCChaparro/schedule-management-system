import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.css']
})
export class SubjectsTableComponent {
  title = 'Materias';

  displayedColumns = ['checkbox', 'id', 'name', 'credits', 'requirements'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor() {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    let filterValue = target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  selectAllCheckboxes(event: any) {
    this.dataSource.data.forEach(row => row.selected = event.checked);
  }

}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    COURSES[Math.round(Math.random() * (COURSES.length - 1))] + ' ' +
    COURSES[Math.round(Math.random() * (COURSES.length - 1))].charAt(0) + '.';
  const credits = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
  const course = COURSES[Math.round(Math.random() * (COURSES.length - 1))];
  
  return {
    selected: false,
    id: id.toString(),
    name: name,
    credits: credits,
    requirements: course,
  };
}

/** Constants used to fill up our data base. */
//const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const COLORS = ['red', 'green'];

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
  


export interface UserData {
  selected: boolean;
  id: string;
  name: string;
  credits: number;
  requirements: string;
}
