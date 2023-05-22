import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeService {
  public currentTheme = new BehaviorSubject<string>('light');
  currentTheme$ = this.currentTheme.asObservable();

  setTheme(theme: string) {
    console.log('haciendo el set theme pa con theme: ', theme);
    this.currentTheme.next(theme);
  }
}
