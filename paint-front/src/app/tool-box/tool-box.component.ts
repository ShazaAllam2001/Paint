import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css']
})
export class ToolBoxComponent implements OnInit {

  @Output() lineDraw = new EventEmitter<Event>();
  @Output() polyDraw = new EventEmitter<Event>();
  @Output() triDraw = new EventEmitter<Event>();
  @Output() rhomboidDraw = new EventEmitter<Event>();
  @Output() rectDraw = new EventEmitter<Event>();
  @Output() RhombusDraw = new EventEmitter<Event>();
  @Output() TrapeDraw = new EventEmitter<Event>();
  @Output() PentDraw = new EventEmitter<Event>();
  @Output() HexDraw = new EventEmitter<Event>();
  @Output() HeptDraw = new EventEmitter<Event>();
  @Output() CircDraw = new EventEmitter<Event>();
  @Output() ElliDraw = new EventEmitter<Event>();
 

  constructor() { }

  ngOnInit(): void {
  }

  drawLine(event: Event) {
    this.lineDraw.emit(event);
  }
  drawPoly(event: Event) {
    this.polyDraw.emit(event);
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
    this.RhombusDraw.emit(event);
  }

  drawTrape(event: Event) {
    this.TrapeDraw.emit(event);
  }
  drawPent(event: Event) {
    this.PentDraw.emit(event);
  }
  drawHex(event: Event) {
    this.HexDraw.emit(event);
  }
  drawHept(event: Event) {
    this.HeptDraw.emit(event);
  }
  drawCirc(event: Event) {
    this.CircDraw.emit(event);
  }
  drawElli(event: Event) {
    this.ElliDraw.emit(event);
  }

}