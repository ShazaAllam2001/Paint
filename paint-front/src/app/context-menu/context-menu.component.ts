import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @Input() x = 0;
  @Input() y = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
