import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  user = new FormControl();
  pass = new FormControl();

  constructor( private router: Router){ }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
   
    this.form.setValue({username: this.user, password: this.pass});

    console.log(this.form.controls['username'].value.value);

    if (this.form.controls['username'].value.value==='admin') {
      console.log('si es admin');
      this.router.navigate(['admin-menu']);
    } 
    else if (this.form.controls['username'].value.value === 'alumno'){
      this.router.navigate(['alumno']);
    }
    else if (this.form.controls['username'].value.value === 'maestro'){
      this.router.navigate(['maestro-menu']);
    }
    else {
      console.log('no es admin');
    }

  }
  @Input() error: string = '';

  @Output() submitEM = new EventEmitter();
}