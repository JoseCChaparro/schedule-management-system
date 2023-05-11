import { Component, Input, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@Component({
  selector: 'app-students-enrollment',
  templateUrl: './students-enrollment.component.html',
  styleUrls: ['./students-enrollment.component.css']
})
export class StudentsEnrollmentComponent {
  

  name = 'Angular';
  animal = 'Angular';
  

  constructor(public dialog: MatDialog){

   }


  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddStudentsEnrollmentDialog, {
      data: { name: this.name, animal: this.animal },
      
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'add-student-dialog',
  templateUrl: 'add-students-enrollment-dialog.html',
})
export class AddStudentsEnrollmentDialog {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  time = `${new Date().getHours()}:${(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()}`;

  constructor(
    public dialogRef: MatDialogRef<AddStudentsEnrollmentDialog>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close();
  }

}