import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-style-box',
  templateUrl: './style-box.component.html',
  styleUrls: ['./style-box.component.css']
})
export class StyleBoxComponent implements OnInit {
  
  @Output() widthChange = new EventEmitter<string>();
  @Output() dashChange = new EventEmitter<string>();
  @Output() colorChange = new EventEmitter<string>();
  @Output() colorFillChange = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }
  
  changeFont() {
    
  }
  changeWidth() {
    var stroke_width = document.getElementsByTagName("input")[1];
    this.widthChange.emit(stroke_width.value);
  }
  changeDash() {
    var stroke_style = document.getElementsByTagName("select")[0];
    this.dashChange.emit(stroke_style.value);
  }
  changeColor() {
    var stroke_color = document.getElementsByTagName("input")[2];
    this.colorChange.emit(stroke_color.value);
  }
  changeColorFill() {
    var stroke_color = document.getElementsByTagName("input")[3];
    this.colorFillChange.emit(stroke_color.value);
  }
}
