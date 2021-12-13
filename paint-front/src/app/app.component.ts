import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paint-front';
  
  gridChange!: boolean;

  pencilEvent!: Event;
  eraseEvent!: Event;
  textEvent!: Event;

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

  zoomInChange!: Event;
  zoomOutChange!: Event;
  fontChange!: string;
  widthChange!: string;
  dashChange!: string;
  colorChange!: string;
  colorFillChange!: string;

  onChangeGrid(grid: any) {
    this.gridChange = grid;
  }

  onChangePencil(event: Event) {
    this.pencilEvent = event;
  }
  onChangeErase(event: Event) {
    this.eraseEvent = event;
  }
  onChangeText(event: Event) {
    this.textEvent = event;
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

  onChangeZoomIn(event: Event) {
    this.zoomInChange = event;
  }
  onChangeZoomOut(event: Event) {
    this.zoomOutChange = event;
  }
  onChangeFont(font: any) {
    this.fontChange = font;
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
