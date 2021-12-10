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
  rhombusEvent!:Event;
  trapeEvent!:Event;
  pentEvent!:Event;
  hexEvent!:Event;
  heptEvent!:Event;
  circEvent!:Event;
  elliEvent!:Event;
  colorEvent!:Event;
  pencilEvent!:Event;

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
  onChangeRhombus(event: Event) {
    this.rhombusEvent = event;
  }
 
  onChangeTrape(event: Event) {
    this.trapeEvent = event;
  }
  onChangePent(event: Event) {
    this.pentEvent = event;
  }
  onChangeHex(event: Event) {
    this.hexEvent = event;
  }
  onChangeHept(event: Event) {
    this.heptEvent = event;
  }
  onChangeCirc(event: Event) {
    this.circEvent = event;
  }
  onChangeElli(event: Event) {
    this.elliEvent = event;
  }
  onChangeColor(event: Event) {
    this.colorEvent = event;
  }
  onChangePencil(event: Event) {
    this.pencilEvent = event;
  }
  
}