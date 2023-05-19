import { Component, Input, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SubjectsService } from '../subject.service';
import { Subject } from '../subject.model';
import { FormControl } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.css']
})
export class SubjectsTableComponent {
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

  constructor(public dialog: MatDialog, private subjectsService: SubjectsService) {
    // Assign the data to the data source for the table to render
    this.subjects = this.subjectsService.subjects;
    this.dataSource = new MatTableDataSource(this.subjects);
  }
  /*
  ngOnInit(): void {
    this.subjects = this.subjectsService.subjects;
    
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddSubjectDialog, {
      data: {name: '', credits: '', requirements: '', selected: false, id: ''},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The add dialog was closed');
      console.log(result);
      if(result != undefined){
        this.onSubjectAdded(result);
      }
    });
  }

  openUpdateDialog(subjectToBeUpdated: Subject): void {
    console.log("from update dialog subjectToBeUpdated");
    console.log(subjectToBeUpdated);

    const dialogRef = this.dialog.open(UpdateSubjectDialog, {
      data: subjectToBeUpdated,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The update dialog was closed');
      console.log(result);
      this.onSubjectUpdated(result);
    });
  }

  deleteSelectedRows() {
    let SelectedRows = this.dataSource.data.filter(row => row.selected);
    SelectedRows.forEach((row) => {
      this.onSubjectDeleted(row.id);
    });

    this.refreshTable();
    this.checkModifyButton();
    this.checkDeleteButton();
  }

  refreshTable() {
    this.subjects = this.subjectsService.subjects;
    this.dataSource = new MatTableDataSource(this.subjects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  onSubjectAdded(subject: Subject) {
    this.subjectsService.addSubject(subject);
    this.refreshTable();
    this.checkModifyButton();
  }

  onSubjectUpdated(subject: Subject) {
    console.log("antes de mandar el subject al servicio:", subject);
    this.subjectsService.updateSubject(subject);
    this.checkModifyButton();
    this.refreshTable();
  }

  onSubjectDeleted(id: string) {
    this.subjectsService.deleteSubject(id);
  }
  
  onFindSubject(id: string) {
    this.subjectsService.findSubject(id);
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

@Component({
  selector: 'add-subject-dialog',
  templateUrl: 'add-subject-dialog.html',
})
export class AddSubjectDialog {
  id: string = '';
  name: string = '';
  credits: number = 0;
  requirements: string[] = [];
  selected: boolean = false;
  courses = new FormControl('');
  
  constructor(
    public dialogRef: MatDialogRef<AddSubjectDialog>,
    private subjectsService: SubjectsService,
    @Inject(MAT_DIALOG_DATA) public data: Subject
  ) { }
    
  coursesList : string[] = this.subjectsService.getCourses();

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    
    let subject: Subject = {
      id: this.id,
      name: this.name,
      credits: this.credits,
      requirements: this.requirements,
      selected: this.selected
    }
  
    this.dialogRef.close(subject);
  }

}

@Component({
  selector: 'update-subject-dialog',
  templateUrl: 'update-subject-dialog.html',
})
export class UpdateSubjectDialog {
  id: string = '';
  name: string = '';
  credits: number = 0;
  requirements: string[] = [''];
  selected: boolean = false;
  
  courses = new FormControl('');
  
  constructor(
    public dialogRef: MatDialogRef<AddSubjectDialog>,
    private subjectsService: SubjectsService,
    @Inject(MAT_DIALOG_DATA) public data: Subject
  ) {
    this.id = data.id;
    this.name = data.name;
    this.credits = data.credits;
    this.requirements = data.requirements;
    this.selected = data.selected;
   }
    
  coursesList : string[] = this.subjectsService.getCourses();

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {

    let subject: Subject = {
      id: this.id,
      name: this.name,
      credits: this.credits,
      requirements: this.requirements,
      selected: this.selected
    }

    this.dialogRef.close(subject);
  }

}