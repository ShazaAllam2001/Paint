import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-style-box',
  templateUrl: './style-box.component.html',
  styleUrls: ['./style-box.component.css']
})
export class StyleBoxComponent implements OnInit {
  isBold: boolean = false;
  isCapitalized: boolean = false;
  isItalic: boolean = false;
  
  @Output() zoomInChange = new EventEmitter<Event>();
  @Output() zoomOutChange = new EventEmitter<Event>();
  @Output() fontChange = new EventEmitter<string>();
  @Output() widthChange = new EventEmitter<string>();
  @Output() dashChange = new EventEmitter<string>();
  @Output() colorChange = new EventEmitter<string>();
  @Output() colorFillChange = new EventEmitter<{fillCheck: boolean, fillColor: string}>();

  constructor() { }

  ngOnInit(): void {
  }
  
  zoomIn(event: Event) {
    var zoom_label = document.getElementsByClassName("zoom-ratio")[0];
    var ratio = parseInt(zoom_label.innerHTML.slice(0,-1));
    if(ratio<200) {
      zoom_label.innerHTML = String(ratio+10) + '%';
      this.zoomInChange.emit(event);
    }
  }
  zoomOut(event: Event) {
    var zoom_label = document.getElementsByClassName("zoom-ratio")[0];
    var ratio = parseInt(zoom_label.innerHTML.slice(0,-1));
    if(ratio>50) {
      zoom_label.innerHTML = String(ratio-10) + '%';
      this.zoomOutChange.emit(event);
    }
  }
  bold() {
    this.isBold = !this.isBold;
    var bold = document.getElementById("bold");
    if(bold) {
      if(this.isBold) {
        bold.style.backgroundColor = "var(--hovered)";
      } else {
        bold.style.backgroundColor = "var(--unhovered)";
      }
    }
    this.changeFont();
  }
  capitalize() {
    this.isCapitalized = !this.isCapitalized;
    var capitalize = document.getElementById("capitalize");
    if(capitalize) {
      if(this.isCapitalized) {
        capitalize.style.backgroundColor = "var(--hovered)";
      } else {
        capitalize.style.backgroundColor = "var(--unhovered)";
      }
    }
    this.changeFont();
  }
  italic() {
    this.isItalic = !this.isItalic;
    var italic = document.getElementById("italic");
    if(italic) {
      if(this.isItalic) {
        italic.style.backgroundColor = "var(--hovered)";
      } else {
        italic.style.backgroundColor = "var(--unhovered)";
      }
    }
    this.changeFont();
  }
  changeFont() {
    var font_family = document.getElementsByTagName("select")[0];
    var font_size = document.getElementsByTagName("input")[1];
    var font_style = '';
    if(this.isItalic) {
      font_style = font_style.concat("italic");
    } if(this.isBold) {
      font_style = font_style.concat("bold");
    } if(this.isCapitalized) {
      font_style = font_style.concat("small-caps");
    }
    font_style = font_style.concat(" ", font_size.value, "px ", font_family.value);
    console.log(font_style);
    this.fontChange.emit(font_style);
  }
  changeWidth() {
    var stroke_width = document.getElementsByTagName("input")[2];
    this.widthChange.emit(stroke_width.value);
  }
  changeDash() {
    var stroke_style = document.getElementsByTagName("select")[1];
    this.dashChange.emit(stroke_style.value);
  }
  changeColor() {
    var stroke_color = document.getElementsByTagName("input")[3];
    this.colorChange.emit(stroke_color.value);
  }
  changeColorFill() {
    var fill_color = document.getElementsByTagName("input")[4];
    var check_fill = document.getElementsByTagName("input")[5];
    this.colorFillChange.emit({fillCheck: check_fill.checked, fillColor: fill_color.value});
  }
}
