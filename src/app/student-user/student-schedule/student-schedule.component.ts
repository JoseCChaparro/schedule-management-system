import { Component, Inject, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { HorarioService } from '../../horario.service'
import { Course } from '../../courses/course.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from '../../courses/course.service';

export interface Element {
  hora: string;
  domingo: string;
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
  sabado: string;
}


@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.css']
})
export class StudentScheduleComponent {

  background: ThemePalette = undefined;
  displayedColumns: string[] = ['demo-hora', 'demo-domingo', 'demo-lunes', 'demo-martes', 'demo-miercoles', 'demo-jueves', 'demo-viernes', 'demo-sabado'];

  dataSource: Element[] = [];
  mondayHours: string[] = [];
  tuesdayHours: string[] = [];
  wednesdayHours: string[] = [];
  thursdayHours: string[] = [];
  fridayHours: string[] = [];
  saturdayHours: string[] = [];
  sundayHours: string[] = [];

  datesInWeek: Date[] = [];
  hours: string[] = [];

  todaslasHoras: string[] = [];

  courses: Course[] = [];

  daysWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  columns: string[] = [];

  constructor(
    private horarioService: HorarioService,
    private courseService: CoursesService
  ) {

    this.courses = this.courseService.courses;

    let mondayTemp: string[] = [];
    let thursdayTemp: string[] = [];
    let wednesdayTemp: string[] = [];
    let tuesdayTemp: string[] = [];
    let fridayTemp: string[] = [];
    let saturdayTemp: string[] = [];
    let sundayTemp: string[] = [];

    this.courses.forEach(function (course: Course) {
      course.mondayHours.forEach(function (courseMondayHour: string) {
        mondayTemp.push(courseMondayHour + " " + course.subject + " " + course.teacher + " Salón " + course.salon);
      });
      course.thursdayHours.forEach(function (courseThurdayHour: string) {
        thursdayTemp.push(courseThurdayHour + " " + course.subject + " " + course.teacher + " Salón " + course.salon);
      });
      course.wednesdayHours.forEach(function (courseWednesayHour: string) {
        wednesdayTemp.push(courseWednesayHour + " " + course.subject + " " + course.teacher + " Salón " + course.salon);
      });
      course.tuesdayHours.forEach(function (courseTuesdayHour: string) {
        tuesdayTemp.push(courseTuesdayHour + " " + course.subject + " " + course.teacher + " Salón " + course.salon);
      });
      course.fridayHours.forEach(function (courseFridayHour: string) {
        fridayTemp.push(courseFridayHour + " " + course.subject + " " + course.teacher + " Salón " + course.salon);
      });
      course.saturdayHours.forEach(function (courseSaturdayHour: string) {
        saturdayTemp.push(courseSaturdayHour + " " + course.subject + " " + course.teacher + " Salón " + course.salon);
      });
      course.sundayHours.forEach(function (courseSundayHour: string) {
        sundayTemp.push(courseSundayHour + " " + course.subject + " " + course.teacher + " Salón " + course.salon);
      });

    });
    this.mondayHours = [...mondayTemp];
    this.thursdayHours = [...thursdayTemp];
    this.wednesdayHours = [...wednesdayTemp];
    this.tuesdayHours = [...tuesdayTemp];
    this.fridayHours = [...fridayTemp];
    this.saturdayHours = [...saturdayTemp];
    this.sundayHours = [...sundayTemp];
    this.todaslasHoras = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

  }

  ngOnInit() {
    this.datesInWeek = this.horarioService.getDaysOfWeek(new Date());
    this.hours = Array.from({ length: 15 }, (_, i) =>
      ((i + 7).toString().length < 2 ? "0" + (i + 7).toString() : (i + 7).toString()) + ":00");
    this.columns = [...this.todaslasHoras, ...this.daysWeek];
    let tempData: Element[] = [
      {
        hora: "07:00", domingo: this.getInfo(6, "07:00"), lunes: this.getInfo(0, "07:00"),
        martes: this.getInfo(1, "07:00"), miercoles: this.getInfo(2, "07:00"), jueves: this.getInfo(3, "07:00"),
        viernes: this.getInfo(4, "07:00"), sabado: this.getInfo(5, "07:00")
      },
      {
        hora: "08:00", domingo: this.getInfo(6, "08:00"), lunes: this.getInfo(0, "08:00"),
        martes: this.getInfo(1, "08:00"), miercoles: this.getInfo(2, "08:00"), jueves: this.getInfo(3, "08:00"),
        viernes: this.getInfo(4, "08:00"), sabado: this.getInfo(5, "08:00")
      },
      {
        hora: "09:00", domingo: this.getInfo(6, "09:00"), lunes: this.getInfo(0, "09:00"),
        martes: this.getInfo(1, "09:00"), miercoles: this.getInfo(2, "09:00"), jueves: this.getInfo(3, "09:00"),
        viernes: this.getInfo(4, "09:00"), sabado: this.getInfo(5, "09:00")
      },
      {
        hora: "10:00", domingo: this.getInfo(6, "10:00"), lunes: this.getInfo(0, "10:00"),
        martes: this.getInfo(1, "10:00"), miercoles: this.getInfo(2, "10:00"), jueves: this.getInfo(3, "10:00"),
        viernes: this.getInfo(4, "10:00"), sabado: this.getInfo(5, "10:00")
      },
      {
        hora: "11:00", domingo: this.getInfo(6, "11:00"), lunes: this.getInfo(0, "11:00"),
        martes: this.getInfo(1, "11:00"), miercoles: this.getInfo(2, "11:00"), jueves: this.getInfo(3, "11:00"),
        viernes: this.getInfo(4, "11:00"), sabado: this.getInfo(5, "11:00")
      },
      {
        hora: "12:00", domingo: this.getInfo(6, "12:00"), lunes: this.getInfo(0, "12:00"),
        martes: this.getInfo(1, "12:00"), miercoles: this.getInfo(2, "12:00"), jueves: this.getInfo(3, "12:00"),
        viernes: this.getInfo(4, "12:00"), sabado: this.getInfo(5, "12:00")
      },
      {
        hora: "13:00", domingo: this.getInfo(6, "13:00"), lunes: this.getInfo(0, "13:00"),
        martes: this.getInfo(1, "13:00"), miercoles: this.getInfo(2, "13:00"), jueves: this.getInfo(3, "13:00"),
        viernes: this.getInfo(4, "13:00"), sabado: this.getInfo(5, "13:00")
      },
      {
        hora: "14:00", domingo: this.getInfo(6, "14:00"), lunes: this.getInfo(0, "14:00"),
        martes: this.getInfo(1, "14:00"), miercoles: this.getInfo(2, "14:00"), jueves: this.getInfo(3, "14:00"),
        viernes: this.getInfo(4, "14:00"), sabado: this.getInfo(5, "14:00")
      },
      {
        hora: "15:00", domingo: this.getInfo(6, "15:00"), lunes: this.getInfo(0, "15:00"),
        martes: this.getInfo(1, "15:00"), miercoles: this.getInfo(2, "15:00"), jueves: this.getInfo(3, "15:00"),
        viernes: this.getInfo(4, "15:00"), sabado: this.getInfo(5, "15:00")
      },
      {
        hora: "16:00", domingo: this.getInfo(6, "16:00"), lunes: this.getInfo(0, "16:00"),
        martes: this.getInfo(1, "16:00"), miercoles: this.getInfo(2, "16:00"), jueves: this.getInfo(3, "16:00"),
        viernes: this.getInfo(4, "16:00"), sabado: this.getInfo(5, "16:00")
      },
      {
        hora: "17:00", domingo: this.getInfo(6, "17:00"), lunes: this.getInfo(0, "17:00"),
        martes: this.getInfo(1, "17:00"), miercoles: this.getInfo(2, "17:00"), jueves: this.getInfo(3, "17:00"),
        viernes: this.getInfo(4, "17:00"), sabado: this.getInfo(5, "17:00")
      },
      {
        hora: "18:00", domingo: this.getInfo(6, "18:00"), lunes: this.getInfo(0, "18:00"),
        martes: this.getInfo(1, "18:00"), miercoles: this.getInfo(2, "18:00"), jueves: this.getInfo(3, "18:00"),
        viernes: this.getInfo(4, "18:00"), sabado: this.getInfo(5, "18:00")
      },
      {
        hora: "19:00", domingo: this.getInfo(6, "19:00"), lunes: this.getInfo(0, "19:00"),
        martes: this.getInfo(1, "19:00"), miercoles: this.getInfo(2, "19:00"), jueves: this.getInfo(3, "19:00"),
        viernes: this.getInfo(4, "19:00"), sabado: this.getInfo(5, "19:00")
      },
      {
        hora: "20:00", domingo: this.getInfo(6, "20:00"), lunes: this.getInfo(0, "20:00"),
        martes: this.getInfo(1, "20:00"), miercoles: this.getInfo(2, "20:00"), jueves: this.getInfo(3, "20:00"),
        viernes: this.getInfo(4, "20:00"), sabado: this.getInfo(5, "20:00")
      },
      {
        hora: "21:00", domingo: this.getInfo(6, "21:00"), lunes: this.getInfo(0, "21:00"),
        martes: this.getInfo(1, "21:00"), miercoles: this.getInfo(2, "21:00"), jueves: this.getInfo(3, "21:00"),
        viernes: this.getInfo(4, "21:00"), sabado: this.getInfo(5, "21:00")
      },
    ];
    this.dataSource = [...tempData]
  }


  getInfo(date: number, hour: string) {
    let day = date;
    let info: string = "";

    switch (day) {
      case 0: {
        this.mondayHours.forEach(function (arrayHour) {
          if (arrayHour.includes(hour)) {
            info = arrayHour.replace(hour, "");
          }
        });
        break;
      }
      case 1: {
        this.tuesdayHours.forEach(function (arrayHour) {
          if (arrayHour.includes(hour)) {
            info = arrayHour.replace(hour, "");
          }
        });
        break;
      }
      case 2: {
        this.wednesdayHours.forEach(function (arrayHour) {
          if (arrayHour.includes(hour)) {
            info = arrayHour.replace(hour, "");
          }
        });
        break;
      }
      case 3: {
        this.thursdayHours.forEach(function (arrayHour) {
          if (arrayHour.includes(hour)) {
            info = arrayHour.replace(hour, "");
          }
        });
        break;
      }
      case 4: {
        this.fridayHours.forEach(function (arrayHour) {
          if (arrayHour.includes(hour)) {
            info = arrayHour.replace(hour, "");
          }
        });
        break;
      }
      case 5: {
        this.saturdayHours.forEach(function (arrayHour) {
          if (arrayHour.includes(hour)) {
            info = arrayHour.replace(hour, "");
          }
        });
        break;
      }
      case 6: {
        this.sundayHours.forEach(function (arrayHour) {
          if (arrayHour.includes(hour)) {
            info = arrayHour.replace(hour, "");
          }
        });
        break;
      }
    }
    return info;
  }

}