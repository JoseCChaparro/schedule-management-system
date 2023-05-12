import { Component, Input, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../student.model';
import { StudentsService } from '../student.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})

export class StudentsTableComponent {
  title = 'Alumnos';

  displayedColumns = ['checkbox', 'id', 'name', 'surname', 'course', 'status'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  @Input() students: Student[] = [];

  studentSelected!: Student;

  modifyButtonDisabled: boolean = true;
  deleteButtonDisabled: boolean = true;

  constructor(public dialog: MatDialog, private studentsService: StudentsService) {
    // Assign the data to the data source for the table to render
    this.students = this.studentsService.students;
    this.dataSource = new MatTableDataSource(this.students);
  }

  ngOnInit(): void {
    this.students = this.studentsService.students;
    
    this.paginator._intl.itemsPerPageLabel = 'Alumnos por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterContentInit() {
    
    //Paginator configuration
    this.paginator.pageSize = 10;
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
    this.checkModifyButton();
    if (this.countCheckedRows() == 0) {
      this.deleteButtonDisabled = true;
    } else {
      this.deleteButtonDisabled = false;
    }

  }

  countCheckedRows() {
    return this.dataSource.data.filter(row => row.selected).length;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddStudentDialog, {
      data: { name: '', sourname: '', course: '', status: '', color: '', selected: false, id: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The add dialog was closed');
      console.log(result);
      if(result != undefined){
        this.onStudentAdded(result);
      }
    });
  }

  openUpdateDialog(studentToBeUpdated: Student): void {
    console.log("from update dialog studentToBeUpdated");
    console.log(studentToBeUpdated);

    const dialogRef = this.dialog.open(UpdateStudentDialog, {
      data: studentToBeUpdated,
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The update dialog was closed');
      console.log(result);
      this.onStudentUpdated(result);
    });
  }

  deleteSelectedRows() {
    let SelectedRows = this.dataSource.data.filter(row => row.selected);
    SelectedRows.forEach((row) => {
      this.onStudentDeleted(row.id);
    });

    this.refreshTable();
    this.checkModifyButton();
    if (this.countCheckedRows() == 0) {
      this.deleteButtonDisabled = true;
    }
  }

  refreshTable() {
    this.students = this.studentsService.students;
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  onStudentAdded(student: Student) {
    this.studentsService.addStudent(student);
    this.refreshTable();
    this.checkModifyButton();
  }


  onStudentUpdated(student: Student) {
    console.log("antes de mandar el student al servicio:", student);
    this.studentsService.updateStudent(student);
    this.checkModifyButton();
    this.refreshTable();
  }

  onStudentDeleted(id: string) {
    this.studentsService.deleteStudent(id);
  }

  onFindStudent(id: string) {
    this.studentsService.findStudent(id);
  }

  selectRow($event: any, dataSource: Student) {
    // console.log($event.checked);
    if ($event.checked) {
      console.log("checked");
      console.log(dataSource);
      this.studentSelected = dataSource;
    }

    this.checkModifyButton();
    this.checkDeleteButton();

  }

  checkModifyButton() {
    if (this.countCheckedRows() > 1 || this.countCheckedRows() == 0) {
      this.studentSelected = new Student('', '', '', '', '', '', false);
      this.modifyButtonDisabled = true;
    }
    if (this.countCheckedRows() == 1) {
      this.modifyButtonDisabled = false;
      this.studentSelected = this.dataSource.data.filter(row => row.selected)[0];
    }
  }

  checkDeleteButton() {
    if (this.countCheckedRows() == 0) {
      this.deleteButtonDisabled = true;
    } else {
      this.deleteButtonDisabled = false;
    }
  }



}


@Component({
  selector: 'add-student-dialog',
  templateUrl: 'add-student-dialog.html',
})
export class AddStudentDialog {
  id: string = '';
  name: string = '';
  surname: string = '';
  course: string = '';
  status: string = '';
  color: string = '';
  selected: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<AddStudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {


    this.color = this.status === 'inscrito' ? 'green' : 'red';

    var student: Student = {
      id: this.id,
      name: this.name,
      surname: this.surname,
      course: this.course,
      status: this.status,
      color: this.color,
      selected: this.selected
    }


    this.dialogRef.close(student);
  }


}

@Component({
  selector: 'update-student-dialog',
  templateUrl: 'update-student-dialog.html',
})
export class UpdateStudentDialog {
  id: string = '';
  name: string = '';
  surname: string = '';
  course: string = '';
  status: string = '';
  color: string = '';
  selected: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<UpdateStudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Student) 
    {
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.course = data.course;
    this.status = data.status;
    this.color = data.color;
    this.selected = data.selected;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    console.log("Saludos desde onSaveClick");
    this.color = this.status === 'inscrito' ? 'green' : 'red';

    var student: Student = {
      id: this.id,
      name: this.name,
      surname: this.surname,
      course: this.course,
      status: this.status,
      color: this.color,
      selected: this.selected
    }

    this.dialogRef.close(student);
  }

}