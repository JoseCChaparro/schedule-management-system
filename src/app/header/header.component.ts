import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() showBackButton: boolean = true;
  @Input() showLogoutButton: boolean = true;
  
  constructor(private location: Location) { }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  goBack(): void {
    this.location.back();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  }
}
