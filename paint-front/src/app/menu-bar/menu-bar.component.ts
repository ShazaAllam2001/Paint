import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  isGrid: boolean = true;

  @Output() gridShow = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  grid() {
    this.isGrid = !this.isGrid;
    this.gridShow.emit(this.isGrid);
  }

}
