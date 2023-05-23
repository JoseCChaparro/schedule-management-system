import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'schedule-management-system';

  @HostBinding('class') componentCssClass: any;

  constructor(public overlayContainer: OverlayContainer, private themesService: ThemeService){
    
  }

  public onSetTheme(e: string){

    this.themesService.buttonPressed.subscribe((e) => {
      this.overlayContainer.getContainerElement().classList.replace(this.componentCssClass,e);
      this.componentCssClass = e;
    });
  }
}
