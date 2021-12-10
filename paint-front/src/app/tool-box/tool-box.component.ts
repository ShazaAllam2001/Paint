import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css']
})
export class ToolBoxComponent implements OnInit {

  @Output() lineDraw = new EventEmitter<Event>();
  @Output() triDraw = new EventEmitter<Event>();
  @Output() rhomboidDraw = new EventEmitter<Event>();
  @Output() rectDraw = new EventEmitter<Event>();
  @Output() rhombusDraw = new EventEmitter<Event>();
  @Output() trapezoidDraw = new EventEmitter<Event>();
  @Output() pentDraw = new EventEmitter<Event>();
  @Output() hexDraw = new EventEmitter<Event>();
  @Output() heptDraw = new EventEmitter<Event>();
  @Output() circDraw = new EventEmitter<Event>();
  @Output() elliDraw = new EventEmitter<Event>();

  constructor() { }

  ngOnInit(): void {
  }

  drawLine(event: Event) {
    this.lineDraw.emit(event);
  }
  drawTriangle(event: Event) {
    this.triDraw.emit(event);
  }
  drawRhomboid(event: Event) {
    this.rhomboidDraw.emit(event);
  }
  drawRect(event: Event) {
    this.rectDraw.emit(event);
  }
  drawRhombus(event: Event) {
    this.rhombusDraw.emit(event);
  }
  drawTrapezoid(event: Event) {
    this.trapezoidDraw.emit(event);
  }
  drawPent(event: Event) {
    this.pentDraw.emit(event);
  }
  drawHex(event: Event) {
    this.hexDraw.emit(event);
  }
  drawHept(event: Event) {
    this.heptDraw.emit(event);
  }
  drawCirc(event: Event) {
    this.circDraw.emit(event);
  }
  drawElli(event: Event) {
    this.elliDraw.emit(event);
  }

}
