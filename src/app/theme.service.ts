import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class ThemeService{

    @Output() buttonPressed = new EventEmitter<string>();

    constructor(){

    }

    public onSetTheme(theme:string){
        this.buttonPressed.emit(theme);
    }

    public getTheme(){
        
    }


}