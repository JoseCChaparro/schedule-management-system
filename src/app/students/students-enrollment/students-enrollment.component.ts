import { Component, Input, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { EventSettingsModel, MonthService, ResizeService, DragAndDropService, NavigatingEventArgs, View, EventRenderedArgs } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';
import { generateObject, zooEventsData } from '../../data';
import { DateRange } from '@angular/material/datepicker';


@Component({
  selector: 'app-students-enrollment',
  templateUrl: './students-enrollment.component.html',
  styleUrls: ['./students-enrollment.component.css'],
  providers: [MonthService, ResizeService, DragAndDropService]
})
export class StudentsEnrollmentComponent {
  public displayDate: Date = new Date(2023, 4, 17);
  public eventSettings: EventSettingsModel = {

    dataSource: generateObject(new Date(2023, 1, 1).getTime(), new Date(2023, 12, 31).getTime(), true)
  };
  dateRange: any;
  name = 'Angular';
  animal = 'Angular';


  constructor(public dialog: MatDialog) {

  }

  onDeletePeriod() {
    this.dateRange = undefined;
    this.eventSettings = {
      allowAdding: false,
      allowEditing: false,
      allowDeleting: false,
      dataSource: [],
    };
  }

  onModifyPeriod() {
    this.openUpdateDialog();
  }



  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddStudentsEnrollmentDialog, {
      data: { name: this.name, animal: this.animal },

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;

      console.log(result.value);
      this.dateRange = result.value;
      this.updateCalendar();
    });
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateStudentsEnrollmentDialog, {
      data: { starDate: this.dateRange.start, endDate: this.dateRange.end },

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;

      console.log(result.value);
      this.dateRange = result.value;
      this.updateCalendar();
    });
  }

  updateCalendar() {
    let enrollmentPeriod = {
      Id: 1,
      Subject: "Periodo de inscripcion",
      StartTime: this.dateRange.start,
      EndTime: this.dateRange.end,
    }
    //this.eventSettings = { dataSource: generateObject(this.dateRange.start.getTime(), this.dateRange.end.getTime(), true) };
    this.eventSettings = {
      allowAdding: false,
      allowEditing: false,
      allowDeleting: false,
      dataSource: [enrollmentPeriod],

    };
  }

  isThereEnrollmentPeriod() {
    if (this.dateRange != undefined) {
      return true;
    }
    return false;
  }

  onPopupOpen(args: any) {
    args.cancel = true;
  }


  public data: Record<string, any>[] = extend([], zooEventsData, undefined, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 1, 15);
  //public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Month';

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data['CategoryColor'] as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
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

  time = `${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`;

  constructor(
    public dialogRef: MatDialogRef<AddStudentsEnrollmentDialog>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.range);
  }

  @Input() selectedRangeValue: DateRange<Date> | undefined;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.range.value.start = this.selectedRangeValue.start;
    this.range.value.end = this.selectedRangeValue.end;
    console.log(this.range.value);
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

}

@Component({
  selector: 'update-student-dialog',
  templateUrl: 'update-students-enrollment-dialog.html',
})
export class UpdateStudentsEnrollmentDialog {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateStudentsEnrollmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.range.value.start = data.starDate;
    this.range.value.end = data.endDate;
    this.selectedRangeValue = new DateRange<Date>(data.starDate, data.endDate);
  }


  @Input() selectedRangeValue: DateRange<Date> | undefined;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.range.value.start = this.selectedRangeValue.start;
    this.range.value.end = this.selectedRangeValue.end;
    console.log(this.range.value);
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

  time = `${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`;


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.range);
  }

}