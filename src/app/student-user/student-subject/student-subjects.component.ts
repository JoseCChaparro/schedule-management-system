import { Component, Input, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { StudentSubjectService } from './student-subject.service';
import { Subject } from './student-subject.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-subjects',
  templateUrl: './student-subjects.component.html',
  styleUrls: ['./student-subjects.component.css']
})
export class StudentSubjectComponent {
  title = 'Materias';

  displayedColumns = ['checkbox', 'id', 'name', 'credits', 'requirements'];
  dataSource: MatTableDataSource<Subject>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  subjects: Subject[] = [];

  subjectSelected!: Subject;

  modifyButtonDisabled: boolean = true;
  deleteButtonDisabled: boolean = true;

  constructor(public dialog: MatDialog, private studentSubjectService: StudentSubjectService) {
    // Assign the data to the data source for the table to render
    this.subjects = this.studentSubjectService.subjects;
    this.dataSource = new MatTableDataSource(this.subjects);
  }
  /*
  ngOnInit(): void {
    this.subjects = this.StudentSubjectService.subjects;
    
    this.paginator._intl.itemsPerPageLabel = 'Materias por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.paginator.pageSize = 10;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Materias por página';
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


  refreshTable() {
    this.subjects = this.studentSubjectService.subjects;
    this.dataSource = new MatTableDataSource(this.subjects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  onSubjectAdded(subject: Subject) {
    this.studentSubjectService.addSubject(subject);
    this.refreshTable();
    this.checkModifyButton();
  }

  onSubjectUpdated(subject: Subject) {
    console.log("antes de mandar el subject al servicio:", subject);
    this.studentSubjectService.updateSubject(subject);
    this.checkModifyButton();
    this.refreshTable();
  }

  onSubjectDeleted(id: string) {
    this.studentSubjectService.deleteSubject(id);
  }
  
  onFindSubject(id: string) {
    this.studentSubjectService.findSubject(id);
  }

  selectRow($event: any, dataSource: Subject) {
    
    if ($event.checked) {
      console.log("checked");
      console.log(dataSource);
      this.subjectSelected = dataSource;
    }

    this.checkModifyButton();
    this.checkDeleteButton();

  }

  checkModifyButton() {
    if (this.countCheckedRows() > 1 || this.countCheckedRows() == 0) {
      this.subjectSelected = new Subject('', '', 0, [''], false);
      this.modifyButtonDisabled = true;
    }
    if (this.countCheckedRows() == 1) {
      this.modifyButtonDisabled = false;
      this.subjectSelected = this.dataSource.data.filter(row => row.selected)[0];
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
