import { Component, Inject, NgModule, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '.././course.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoursesService } from '.././course.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
//import { Clase } from './clase';
import { HorarioService } from 'src/app/horario.service';
//import { scheduleData } from './data';


@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent {
  displayedColumns = ['checkbox', 'id', 'subject', 'teacher', 'career', 'semester', 'salon'];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  courses: Course[] = [];

  courseSelected!: Course;

  modifyButtonDisabled: boolean = true;
  deleteButtonDisabled: boolean = true;

  constructor(public dialog: MatDialog, private courseService: CoursesService) {
    // Assign the data to the data source for the table to render
    this.courses = this.courseService.courses;
    this.dataSource = new MatTableDataSource(this.courses);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.paginator.pageSize = 10;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Cursos por página';
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
    this.checkDeleteButton();

  }

  countCheckedRows() {
    return this.dataSource.data.filter(row => row.selected).length;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialog, {
      data: { subject: '', teacher: '', career: '', semester: '', students_quantity: '', salon: '', selected: false, id: '' },
      width: "90%"
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The add dialog was closed');
      console.log(result);
      if(result != undefined){
        this.onCourseAdded(result);
      }
    });
  }

  openUpdateDialog(courseToBeUpdated: Course): void {

    console.log("from update dialog courseToBeUpdated");
    console.log(courseToBeUpdated);

    const dialogRef = this.dialog.open(UpdateCourseDialog, {
      data: courseToBeUpdated,
      width: "60%",
      height: "90%"
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The update dialog was closed');
      console.log(result);
      this.onCourseUpdated(result);
    });
  }

  openViewDialog(courseToBeUpdated: Course): void {

    console.log("from update dialog studentToBeUpdated");
    console.log(courseToBeUpdated);

    const dialogRef = this.dialog.open(ViewCourseDialog, {
      data: courseToBeUpdated,
      width: "90%"
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The update dialog was closed');
      console.log(result);
      this.onCourseUpdated(result);
    });
  }


  deleteSelectedRows() {
    let SelectedRows = this.dataSource.data.filter(row => row.selected);
    SelectedRows.forEach((row) => {
      this.onCourseDeleted(row.id);
    });

    this.refreshTable();
    this.checkModifyButton();
    this.checkDeleteButton();

  }

  refreshTable() {
    this.courses = this.courseService.courses;
    this.dataSource = new MatTableDataSource(this.courses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  onCourseAdded(course: Course) {
    this.courseService.addCourse(course);
    this.refreshTable();
    this.checkModifyButton();
  }


  onCourseUpdated(course: Course) {
    console.log("antes de mandar el student al servicio:", course);
    this.courseService.updateCourse(course);
    this.checkModifyButton();
    this.refreshTable();
  }

  onCourseDeleted(id: string) {
    this.courseService.deleteCourse(id);
  }

  onFindCourse(id: string) {
    this.courseService.findCourse(id);
  }

  selectRow($event: any, dataSource: Course) {
    // console.log($event.checked);
    if ($event.checked) {
      console.log("checked");
      console.log(dataSource);
      this.courseSelected = dataSource;
    }

    this.checkModifyButton();
    this.checkDeleteButton();

  }

  checkModifyButton() {
    if (this.countCheckedRows() > 1 || this.countCheckedRows() == 0) {
      this.courseSelected = new Course('', '', '', '', '', '','', false, [],[],[],[],[],[],[]);
      this.modifyButtonDisabled = true;
    }
    if (this.countCheckedRows() == 1) {
      this.modifyButtonDisabled = false;
      this.courseSelected = this.dataSource.data.filter(row => row.selected)[0];
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
  selector: 'add-course-dialog',
  templateUrl: 'add-course-dialog.html',
  //providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class AddCourseDialog {
  id: string = '';
  subject: string = '';
  teacher: string = '';
  career: string = '';
  semester: string = '';
  salon: string= '';
  students_quantity: string = '';
  selected: boolean = false;
  mondayHours: string[] = [];
  tuesdayHours: string[] = [];
  wednesdayHours: string[] = [];
  thursdayHours: string[] = [];
  fridayHours: string[] = [];
  saturdayHours: string[] = [];
  sundayHours: string[] = [];


  datesInWeek: Date[] = [];
  hours: string[] = [];


  daysWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ]


  constructor(
    public dialogRef: MatDialogRef<AddCourseDialog>,
    private horarioService: HorarioService,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {

    var course: Course = {
      id: this.id,
      subject: this.subject,
      teacher: this.teacher,
      career: this.career,
      semester: this.semester,
      students_quantity: this.students_quantity,
      salon: this.salon,
      selected: this.selected,
      mondayHours: this.mondayHours,
      tuesdayHours: this.tuesdayHours,
      wednesdayHours: this.wednesdayHours,
      thursdayHours: this.thursdayHours,
      fridayHours: this.fridayHours,
      saturdayHours: this.saturdayHours,
      sundayHours: this.sundayHours
    }


    this.dialogRef.close(course);
  }

  ngOnInit() {
    this.datesInWeek = this.horarioService.getDaysOfWeek(new Date());
    this.hours = Array.from({length: 15}, (_, i) =>
      ((i+7).toString().length < 2 ? "0"+(i+7).toString(): (i+7).toString()) + ":00");
  }


  checkHourInCourse(date: Date, hour: string): boolean {

    let day: number = date.getDay();
    let match: boolean = false;

    switch (day){
      case 0:{
        this.mondayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 1:{
        this.tuesdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 2:{
        this.wednesdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 3:{
        this.thursdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 4:{
        this.fridayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 5:{
        this.saturdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 6:{
        this.sundayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
    }
    return match;
  }

  getDateFormat(date: Date): string {
    const dayInWeek = this.daysWeek[date.getDay()]
    return `${dayInWeek}`
  }

  onHourClick(date: Date, hour: string, isSelected: boolean): void{
    console.log("recibimos curso " + this.id + " con día " + date.getDay()
    + " a las " + hour + " y actualmente ta " +isSelected);
    if(isSelected == true){
      switch (date.getDay()){
        case 0:{
          const index = this.mondayHours.indexOf(hour);
          const deletedElement = this.mondayHours.splice(index, 1)
          console.log("quitamos al lunes la hora " + hour);
          break;
        }
        case 1:{
          const index = this.tuesdayHours.indexOf(hour);
          const deletedElement = this.tuesdayHours.splice(index, 1)
          console.log("quitamos al martes la hora " + hour);
          break;
        }
        case 2:{
          const index = this.wednesdayHours.indexOf(hour);
          const deletedElement = this.wednesdayHours.splice(index, 1)
          console.log("quitamos al miercoles la hora " + hour);
          break;
        }
        case 3:{
          const index = this.thursdayHours.indexOf(hour);
          const deletedElement = this.thursdayHours.splice(index, 1)
          console.log("quitamos al jueves la hora " + hour);
          break;
        }
        case 4:{
          const index = this.fridayHours.indexOf(hour);
          const deletedElement = this.fridayHours.splice(index, 1)
          console.log("quitamos al viernes la hora " + hour);
          break;
        }
        case 5:{
          const index = this.saturdayHours.indexOf(hour);
          const deletedElement = this.saturdayHours.splice(index, 1)
          console.log("quitamos al sabado la hora " + hour);
          break;
        }
        case 6:{
          const index = this.sundayHours.indexOf(hour);
          const deletedElement = this.sundayHours.splice(index, 1)
          console.log("quitamos al domingo la hora " + hour);
          break;
        }
        }
    }
    else{
      switch (date.getDay()){
        case 0:{
          this.mondayHours.push(hour);
          console.log("agregamos al lunes la hora " + hour);
          break;
        }
        case 1:{
          this.tuesdayHours.push(hour);
          console.log("agregamos al martes la hora " + hour);
          break;
        }
        case 2:{
          this.wednesdayHours.push(hour);
          console.log("agregamos al miercoles la hora " + hour);
          break;
        }
        case 3:{
          this.thursdayHours.push(hour);
          console.log("agregamos al jueves la hora " + hour);
          break;
        }
        case 4:{
          this.fridayHours.push(hour);
          console.log("agregamos al viernes la hora " + hour);
          break;
        }
        case 5:{
          this.saturdayHours.push(hour);
          console.log("agregamos al sabado la hora " + hour);
          break;
        }
      }
    }
  }


}



@Component({
  selector: 'update-course-dialog',
  templateUrl: 'update-course-dialog.html'
})
export class UpdateCourseDialog {
  id: string = '';
  subject: string = '';
  teacher: string = '';
  career: string = '';
  semester: string = '';
  students_quantity: string = '';
  salon: string = '';
  selected: boolean = true;

  mondayHours: string[] = [];
  tuesdayHours: string[] = [];
  wednesdayHours: string[] = [];
  thursdayHours: string[] = [];
  fridayHours: string[] = [];
  saturdayHours: string[] = [];
  sundayHours: string[] = [];

  datesInWeek: Date[] = [];
  hours: string[] = [];


  daysWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ]

  constructor(
    public dialogRef: MatDialogRef<UpdateCourseDialog>,
    private horarioService: HorarioService,

    @Inject(MAT_DIALOG_DATA) public data: Course)
    {
    this.id = data.id;
    this.subject = data.subject,
    this.teacher = data.teacher,
    this.career = data.career,
    this.semester = data.semester,
    this.students_quantity = data.students_quantity,
    this.salon = data.salon,
    this.selected = data.selected,
    this.mondayHours = data.mondayHours,
    this.tuesdayHours = data.tuesdayHours,
    this.wednesdayHours = data.wednesdayHours,
    this.thursdayHours = data.thursdayHours,
    this.fridayHours = data.fridayHours,
    this.saturdayHours = data.saturdayHours,
    this.sundayHours = data.sundayHours
  }

  ngOnInit() {
    this.datesInWeek = this.horarioService.getDaysOfWeek(new Date());
    this.hours = Array.from({length: 15}, (_, i) =>
      ((i+7).toString().length < 2 ? "0"+(i+7).toString(): (i+7).toString()) + ":00");
  }


  checkHourInCourse(date: Date, hour: string): boolean {

    let day: number = date.getDay();
    let match: boolean = false;

    switch (day){
      case 0:{
        this.mondayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 1:{
        this.tuesdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 2:{
        this.wednesdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 3:{
        this.thursdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 4:{
        this.fridayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 5:{
        this.saturdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 6:{
        this.sundayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
    }
    return match;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDateFormat(date: Date): string {
    const dayInWeek = this.daysWeek[date.getDay()]
    return `${dayInWeek}`
  }

  onSaveClick(): void {
    console.log("Saludos desde onSaveClick");

    var course: Course = {
      id: this.id,
      subject: this.subject,
      teacher: this.teacher,
      career: this.career,
      semester: this.semester,
      students_quantity: this.students_quantity,
      salon: this.salon,
      selected: this.selected,
      mondayHours: this.mondayHours,
      tuesdayHours: this.tuesdayHours,
      wednesdayHours: this.wednesdayHours,
      thursdayHours: this.thursdayHours,
      fridayHours: this.fridayHours,
      saturdayHours: this.saturdayHours,
      sundayHours: this.sundayHours
    }

    this.dialogRef.close(course);
  }

  onHourClick(date: Date, hour: string, isSelected: boolean): void{
    console.log("recibimos curso " + this.id + " con día " + date.getDay()
    + " a las " + hour + " y actualmente ta " +isSelected);
    if(isSelected == true){
      switch (date.getDay()){
        case 0:{
          const index = this.mondayHours.indexOf(hour);
          const deletedElement = this.mondayHours.splice(index, 1)
          console.log("quitamos al lunes la hora " + hour);
          break;
        }
        case 1:{
          const index = this.tuesdayHours.indexOf(hour);
          const deletedElement = this.tuesdayHours.splice(index, 1)
          console.log("quitamos al martes la hora " + hour);
          break;
        }
        case 2:{
          const index = this.wednesdayHours.indexOf(hour);
          const deletedElement = this.wednesdayHours.splice(index, 1)
          console.log("quitamos al miercoles la hora " + hour);
          break;
        }
        case 3:{
          const index = this.thursdayHours.indexOf(hour);
          const deletedElement = this.thursdayHours.splice(index, 1)
          console.log("quitamos al jueves la hora " + hour);
          break;
        }
        case 4:{
          const index = this.fridayHours.indexOf(hour);
          const deletedElement = this.fridayHours.splice(index, 1)
          console.log("quitamos al viernes la hora " + hour);
          break;
        }
        case 5:{
          const index = this.saturdayHours.indexOf(hour);
          const deletedElement = this.saturdayHours.splice(index, 1)
          console.log("quitamos al sabado la hora " + hour);
          break;
        }
        case 6:{
          const index = this.sundayHours.indexOf(hour);
          const deletedElement = this.sundayHours.splice(index, 1)
          console.log("quitamos al domingo la hora " + hour);
          break;
        }
        }
    }
    else{
      switch (date.getDay()){
        case 0:{
          this.mondayHours.push(hour);
          console.log("agregamos al lunes la hora " + hour);
          break;
        }
        case 1:{
          this.tuesdayHours.push(hour);
          console.log("agregamos al martes la hora " + hour);
          break;
        }
        case 2:{
          this.wednesdayHours.push(hour);
          console.log("agregamos al miercoles la hora " + hour);
          break;
        }
        case 3:{
          this.thursdayHours.push(hour);
          console.log("agregamos al jueves la hora " + hour);
          break;
        }
        case 4:{
          this.fridayHours.push(hour);
          console.log("agregamos al viernes la hora " + hour);
          break;
        }
        case 5:{
          this.saturdayHours.push(hour);
          console.log("agregamos al sabado la hora " + hour);
          break;
        }
      }
    }
  }

  }




@Component({
  selector: 'view-course-dialog',
  templateUrl: 'view-course-dialog.html'
})
export class ViewCourseDialog {
  id: string = '';
  subject: string = '';
  teacher: string = '';
  career: string = '';
  semester: string = '';
  students_quantity: string = '';
  salon: string = '';
  selected: boolean = true;

  mondayHours: string[] = [];
  tuesdayHours: string[] = [];
  wednesdayHours: string[] = [];
  thursdayHours: string[] = [];
  fridayHours: string[] = [];
  saturdayHours: string[] = [];
  sundayHours: string[] = [];

  datesInWeek: Date[] = [];
  hours: string[] = [];


  daysWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ]

  constructor(
    public dialogRef: MatDialogRef<UpdateCourseDialog>,
    private horarioService: HorarioService,

    @Inject(MAT_DIALOG_DATA) public data: Course)
    {
    this.id = data.id;
    this.subject = data.subject,
    this.teacher = data.teacher,
    this.career = data.career,
    this.semester = data.semester,
    this.students_quantity = data.students_quantity,
    this.salon = data.salon,
    this.selected = data.selected,
    this.mondayHours = data.mondayHours,
    this.tuesdayHours = data.tuesdayHours,
    this.wednesdayHours = data.wednesdayHours,
    this.thursdayHours = data.thursdayHours,
    this.fridayHours = data.fridayHours,
    this.saturdayHours = data.saturdayHours,
    this.sundayHours = data.sundayHours
  }

  ngOnInit() {
    this.datesInWeek = this.horarioService.getDaysOfWeek(new Date());
    this.hours = Array.from({length: 15}, (_, i) =>
      ((i+7).toString().length < 2 ? "0"+(i+7).toString(): (i+7).toString()) + ":00");
  }


  checkHourInCourse(date: Date, hour: string): boolean {

    let day: number = date.getDay();
    let match: boolean = false;

    switch (day){
      case 0:{
        this.mondayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 1:{
        this.tuesdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 2:{
        this.wednesdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 3:{
        this.thursdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 4:{
        this.fridayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 5:{
        this.saturdayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
      case 6:{
        this.sundayHours.forEach(function (arrayHour) {
          if(arrayHour.length == 4){
            arrayHour = "0" + arrayHour;
          }
          if(arrayHour === hour){
            match = true;
          }
        });
        break;
      }
    }
    return match;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDateFormat(date: Date): string {
    const dayInWeek = this.daysWeek[date.getDay()]
    return `${dayInWeek}`
  }



}
