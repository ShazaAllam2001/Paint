import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-style-box',
  templateUrl: './style-box.component.html',
  styleUrls: ['./style-box.component.css']
})
export class StyleBoxComponent implements OnInit {
  @Output() Color = new EventEmitter<Event>();
  constructor() { }

  ngOnInit(): void {
  
  }
 
  SetColor(event: Event) {
    this.Color.emit(event);
  }
}
