import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() showBackButton: boolean = true;
  @Input() showLogoutButton: boolean = true;
  currentTheme: string = 'light-theme';
  
  constructor(private location: Location, private themeService: ThemeService) { }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  goBack(): void {
    this.location.back();
  }

  toggleTheme() {
    console.log(this.currentTheme);
    if (this.currentTheme == 'light-theme') {
      this.currentTheme = 'dark-theme';
    } else {
      this.currentTheme = 'light-theme';
    }
    this.themeService.onSetTheme(this.currentTheme);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  }
}
