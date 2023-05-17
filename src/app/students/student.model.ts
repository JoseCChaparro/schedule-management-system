export class Student{

    /*
    nombre: string = '';
    apellido: string = '';
    
    constructor(nombre: string, apellido: string){
        this.nombre = nombre;
        this.apellido = apellido;
    }
    */
    constructor(public id: string,
                public name: string,
                public surname: string,
                public course: string,
                public status: string,
                public color: string,
                public selected: boolean = false
                ){}
    
}