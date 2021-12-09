import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paint-front';
  lineEvent!: Event;
  triEvent!: Event;
  rhomboidEvent!: Event;
  rectEvent!: Event;

  onChangeLine(event: Event) {
    this.lineEvent = event;
  }
  onChangeTri(event: Event) {
    this.triEvent = event;
  }
  onChangeRhomboid(event: Event) {
    this.rhomboidEvent = event;
  }
  onChangeRect(event: Event) {
    this.rectEvent = event;
  }
  
}
