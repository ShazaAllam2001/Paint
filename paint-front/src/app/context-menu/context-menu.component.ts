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

  @Input() text!: shapes.Text[];
  @Input() line!: shapes.LineSegment[];
  @Input() polygon!: shapes.Polygon[];
  @Input() closedShape!: shapes.ClosedShape[];

  @Output() select = new EventEmitter<{Type: string, Shape: shapes.Shape | null}>();

  constructor() { }

  ngOnInit(): void {
  }

  checkShape(): shapes.Shape | null {
    if(this.context) {
      var shape;
      for(var i=this.data.length-1; i>=0; i--) {
        if(this.context.isPointInPath(this.data[i].path as Path2D,this.x,this.y)) {
          shape = this.data[i];
          break;
        }
      }
      if(shape?.name==='Text') {
        for(var i=this.text.length-1; i>=0; i--) {
          if(this.context.isPointInPath(this.text[i].path as Path2D,this.x,this.y)) 
            return this.text[i];
        }
      } else if(shape?.name==='Line') { 
        for(var i=this.line.length-1; i>=0; i--) {
          if(this.context.isPointInPath(this.line[i].path as Path2D,this.x,this.y)) 
            return this.line[i];
        }
      } else if(shape?.name==='Triangle'||
                shape?.name==='Rhomboid'||
                shape?.name==='Rectangle'||
                shape?.name==='Trapezoid'||
                shape?.name==='Polygonal4'||
                shape?.name==='Polygonal5'||
                shape?.name==='Polygonal6'||
                shape?.name==='Polygonal7') {
        for(var i=this.polygon.length-1; i>=0; i--) {
          if(this.context.isPointInPath(this.polygon[i].path as Path2D,this.x,this.y)) 
            return this.polygon[i];
        }
      } else if(shape?.name==='Circle'||
              shape?.name==='Ellipse'||
              shape?.name==='Star'||
              shape?.name==='Heart') { 
        for(var i=this.closedShape.length-1; i>=0; i--) {
          if(this.context.isPointInPath(this.closedShape[i].path as Path2D,this.x,this.y)) 
            return this.closedShape[i];
        }
      }
    }
    return null;
  }
  selectType(type: string) {
    var shape = this.checkShape();
    this.select.emit({Type: type, Shape: shape});
  }
}
