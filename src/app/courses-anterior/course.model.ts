export class Course{

  /*
  nombre: string = '';
  apellido: string = '';

  constructor(nombre: string, apellido: string){
      this.nombre = nombre;
      this.apellido = apellido;
  }
  */
  constructor(public id: string,
              public subject: string,
              public teacher: string,
              public career: string,
              public semester: string,
              public students_quantity: string,
              public salon: string,
              public selected: boolean = false
              ){}

}
