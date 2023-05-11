import { Component, Input, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})

export class StudentsTableComponent {
  title = 'Alumnos';

  displayedColumns = ['checkbox', 'id', 'name', 'surname', 'course', 'status'];
  dataSource: MatTableDataSource<StudentData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  name!: string;
  animal!: string;


  constructor(public dialog: MatDialog) {
    // Create 100 users
    const users: StudentData[] = [];
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
    this.paginator._intl.itemsPerPageLabel = 'Alumnos por página';
    this.paginator.pageSize = 10;
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddStudentDialog, {
      data: { name: this.name, animal: this.animal },
      
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateStudentDialog, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

/** Builds and returns a new User. */
function createNewUser(id: number): StudentData {
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



/** Constants used to fill up our data base. */
//const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
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


export interface StudentData {
  selected: boolean;
  id: string;
  name: string;
  surname: string;
  status: string;
  color: string;
  course: string;
}

@Component({
  selector: 'add-student-dialog',
  templateUrl: 'add-student-dialog.html',
})
export class AddStudentDialog {
  constructor(
    public dialogRef: MatDialogRef<AddStudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: StudentData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'update-student-dialog',
  templateUrl: 'update-student-dialog.html',
})
export class UpdateStudentDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateStudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: StudentData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close();
  }

}