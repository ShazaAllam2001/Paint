import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  isGrid: boolean = true;

  @Output() resizeEvent = new EventEmitter<Event>();
  @Output() gridShow = new EventEmitter<boolean>();
  @Output() deleteEvent = new EventEmitter<Event>();
  @Output() undoEvent = new EventEmitter<Event>();
  @Output() redoEvent = new EventEmitter<Event>();

  constructor() { }

  ngOnInit(): void {
  }

  resize(event: Event) {
    this.resizeEvent.emit(event);
  }
  grid() {
    this.isGrid = !this.isGrid;
    this.gridShow.emit(this.isGrid);
  }
  delete(event: Event) {
    this.deleteEvent.emit(event);
  }
  redo(event: Event) {
    this.redoEvent.emit(event);
  }
  undo(event: Event) {
    this.undoEvent.emit(event);
  }

}
