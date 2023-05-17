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
  
  constructor(private location: Location) { }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  goBack(): void {
    this.location.back();
  }
}
