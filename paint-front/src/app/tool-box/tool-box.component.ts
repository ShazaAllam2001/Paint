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

}
