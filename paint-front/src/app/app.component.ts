import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paint-front';

  pencilEvent!: Event;

  lineEvent!: Event;
  triEvent!: Event;
  rhomboidEvent!: Event;
  rectEvent!: Event;
  rhombusEvent!: Event;
  trapezoidEvent!: Event;
  pentEvent!: Event;
  hexEvent!: Event;
  heptEvent!: Event;
  circEvent!: Event;
  elliEvent!: Event;
  starEvent!: Event;
  heartEvent!: Event;

  widthChange!: string;
  dashChange!: string;
  colorChange!: string;
  colorFillChange!: string;

  onChangePencil(event: Event) {
    this.pencilEvent = event;
  }

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
  onChangeTrapezoid(event: Event) {
    this.trapezoidEvent = event;
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
  onChangeStar(event: Event) {
    this.starEvent = event;
  }
  onChangeHeart(event: Event) {
    this.heartEvent = event;
  }

  onChangeWidth(width: any) {
    this.widthChange = width;
  }
  onChangeDash(dash: any) {
    this.dashChange = dash;
  }
  onChangeColor(color: any) {
    this.colorChange = color;
  }
  onChangeColorFill(color: any) {
    this.colorFillChange = color;
  }
}
