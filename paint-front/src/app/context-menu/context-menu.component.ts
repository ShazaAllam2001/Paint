import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as shapes from '../canvas/shapes';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @Input() x = 0;
  @Input() y = 0;
  @Input() data!: shapes.Shape[];
  @Input() context!: CanvasRenderingContext2D | null | undefined;

  @Output() select = new EventEmitter<{Type: string, Shape: shapes.Shape | null}>();

  constructor() { }

  ngOnInit(): void {
  }

  checkShape(): shapes.Shape | null {
    for(var i=this.data.length-1; i>=0; i--) {
      if(this.context) {
        if(this.context.isPointInPath(this.data[i].path as Path2D,this.x,this.y)) 
          return this.data[i];
      }
    }
    return null;
  }
  selectType(type: string) {
    var shape = this.checkShape();
    this.select.emit({Type: type, Shape: shape});
  }
}
