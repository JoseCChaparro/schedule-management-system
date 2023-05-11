import { Injectable } from '@angular/core';
import { Student } from './students/student.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataServices{
    constructor(private httpClient: HttpClient){

    }

    //Guardar perosonas
    guardarPersonas(students: Student[]){
        this.httpClient.put('https://listado-personas-3891e-default-rtdb.firebaseio.com/datos.json', students)
        .subscribe(
            (response: Object) =>console.log('Resultado de guardar personas: ' + response),
            (error: Object) => console.log('Error al guardar personas: ' + error)
        );

    }


}