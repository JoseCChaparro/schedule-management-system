import { Component, Input, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../teacher.model';
import { TeachersService } from '../teacher.service';


@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})

export class TeachersTableComponent {
  title = 'Maestros';

  displayedColumns = ['checkbox', 'id', 'name', 'surname'];
  dataSource: MatTableDataSource<Teacher>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  teachers: Teacher[] = [];

  teacherSelected!: Teacher;

  modifyButtonDisabled: boolean = true;
  deleteButtonDisabled: boolean = true;

  constructor(public dialog: MatDialog, private teachersService: TeachersService) {
    // Assign the data to the data source for the table to render
    this.teachers = this.teachersService.teachers;
    this.dataSource = new MatTableDataSource(this.teachers);
  }


  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.paginator.pageSize = 10;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Maestros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
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
    const dialogRef = this.dialog.open(AddTeacherDialog, {
      data: { name: '', sourname: '', selected: false, id: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The add dialog was closed');
      console.log(result);
      if(result != undefined){
        this.onTeacherAdded(result);
      }
    });
  }

  openUpdateDialog(teacherToBeUpdated: Teacher): void {
    console.log("From update dialog teacherToBeUpdated");
    console.log(teacherToBeUpdated);

    const dialogRef = this.dialog.open(UpdateTeacherDialog, {
      data: teacherToBeUpdated,
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The update dialog was closed');
      console.log(result);
      this.onTeacherUpdated(result);
    });
  }

  deleteSelectedRows() {
    let SelectedRows = this.dataSource.data.filter(row => row.selected);
    SelectedRows.forEach((row) => {
      this.onTeacherDeleted(row.id);
    });

    this.refreshTable();
    this.checkModifyButton();
    if (this.countCheckedRows() == 0) {
      this.deleteButtonDisabled = true;
    }
  }

  refreshTable() {
    this.teachers = this.teachersService.teachers;
    this.dataSource = new MatTableDataSource(this.teachers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  onTeacherAdded(teacher: Teacher) {
    this.teachersService.addTeacher(teacher);
    this.refreshTable();
    this.checkModifyButton();
  }


  onTeacherUpdated(teacher: Teacher) {
    this.teachersService.updateTeacher(teacher);
    this.checkModifyButton();
    this.refreshTable();
  }

  onTeacherDeleted(id: string) {
    this.teachersService.deleteTeacher(id);
  }

  onFindTeacher(id: string) {
    this.teachersService.findTeacher(id);
  }

  selectRow($event: any, dataSource: Teacher) {
    // console.log($event.checked);
    if ($event.checked) {
      console.log("checked");
      console.log(dataSource);
      this.teacherSelected = dataSource;
    }

    this.checkModifyButton();
    this.checkDeleteButton();

  }

  checkModifyButton() {
    if (this.countCheckedRows() > 1 || this.countCheckedRows() == 0) {
      this.teacherSelected = new Teacher('', '', '', true);
      this.modifyButtonDisabled = true;
    }
    if (this.countCheckedRows() == 1) {
      this.modifyButtonDisabled = false;
      this.teacherSelected = this.dataSource.data.filter(row => row.selected)[0];
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
  selector: 'add-teacher-dialog',
  templateUrl: 'add-teacher-dialog.html',
})
export class AddTeacherDialog {
  id: string = '';
  name: string = '';
  surname: string = '';
  selected: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<AddTeacherDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Teacher
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {


    //this.color = this.status === 'inscrito' ? 'green' : 'red';

    var teacher: Teacher = {
      id: this.id,
      name: this.name,
      surname: this.surname,
      selected: this.selected
    }


    this.dialogRef.close(teacher);
  }


}

@Component({
  selector: 'update-teacher-dialog',
  templateUrl: 'update-teacher-dialog.html',
})
export class UpdateTeacherDialog {
  id: string = '';
  name: string = '';
  surname: string = '';
  selected: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<UpdateTeacherDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Teacher)
    {
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.selected = data.selected;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    console.log("Saludos desde onSaveClick");
    //this.color = this.status === 'inscrito' ? 'green' : 'red';

    var teacher: Teacher = {
      id: this.id,
      name: this.name,
      surname: this.surname,
      selected: this.selected
    }

    this.dialogRef.close(teacher);
  }

}
