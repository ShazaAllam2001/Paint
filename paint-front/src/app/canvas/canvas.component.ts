import { Component, Input, OnInit } from '@angular/core';
import * as shapes from './shapes';
import * as drawing from './drawingShapes';
import * as canvas from './canvasEdit';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  grid_cnv!: HTMLCanvasElement;
  draw_cnv!: HTMLCanvasElement;
  draw_cnv_list!: HTMLCanvasElement[];
  line_width: number = 1.5;
  isDrawing: boolean = false;
  gridShown: boolean = true;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  s: string = '';
  select: { Type: string, Shape: shapes.Shape | null } = { Type: '', Shape: null }; // select type, selected shape index in data array
  dash: number[] = [0, 5, 10, 15];
  data!: shapes.Shape[]; 
  dataRedo!: shapes.Shape[]; 
  // shapes data
  text!: shapes.Text[];
  line!: shapes.LineSegment[];
  polygon!: shapes.Polygon[];
  closedShape!: shapes.ClosedShape[];
  // undo & redo
  undoStack!: ImageData[]; 
  redoStack!: ImageData[]; 

  /* Menu bar Tools */
  @Input()
  set sizeChange(sizeChange: Event) {
    if(sizeChange) {
      this.draw_cnv.width = this.draw_cnv.width*1.1;
      this.draw_cnv.height = this.draw_cnv.height*1.1;
      var ctx = this.draw_cnv?.getContext("2d");
      if(ctx) {
        // draw canvas
        for(let i=0; i<this.data.length; i++) 
          this.data[i].draw(ctx);
      }
      this.grid_cnv.width = this.grid_cnv.width*1.1;
      this.grid_cnv.height = this.grid_cnv.height*1.1;
      canvas.Edit.changeGrid(this.grid_cnv, this.gridShown);
    }
  }
  @Input()
  set gridChange(gridChange: boolean) {
    this.gridShown = gridChange;
    canvas.Edit.changeGrid(this.grid_cnv, gridChange);
  }
  @Input()
  set deleteChange(deleteChange: Event) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(deleteChange && ctx) 
      ctx.clearRect(0,0,this.draw_cnv.width,this.draw_cnv.height); 
    this.data = [];
  }
  @Input()
  set undoChange(undoChange: Event) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(undoChange && ctx) {
      var undoState = this.undoStack.pop();
      if(undoState) {
        this.redoStack.push(undoState);
        ctx.putImageData(this.undoStack[this.undoStack.length-1],0,0);
      }
      var lastShape = this.data?.pop(); 
      if(lastShape)
        this.dataRedo.push(lastShape);
    }
  }
  @Input()
  set redoChange(redoChange: Event) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(redoChange && ctx) {
      var redoState = this.redoStack.pop();
      if(redoState) {
        this.undoStack.push(redoState);
        ctx.putImageData(redoState,0,0);
      }
      var lastShape = this.dataRedo?.pop(); 
      if(lastShape)
        this.data.push(lastShape);
    }
  }
  /* Styling Box */
  @Input()
  set zoomInChange(zoomInEvent: Event) {
    if(zoomInEvent) 
      canvas.Edit.zoomIn(this.draw_cnv, this.data);
  }
  @Input()
  set zoomOutChange(zoomOutEvent: Event) {
    if(zoomOutEvent) 
      canvas.Edit.zoomOut(this.draw_cnv, this.data);
  }
  @Input()
  set fontChange(fontChange: string) {
      canvas.Edit.changeFont(this.draw_cnv, fontChange);
  }
  @Input()
  set widthChange(widthChange: string) { 
      canvas.Edit.changeWidth(this.draw_cnv, widthChange);
  }
  @Input()
  set dashChange(dashChange: string) {
      canvas.Edit.changeDash(this.draw_cnv, dashChange, this.dash);
  }
  @Input()
  set colorChange(colorChange: string) {
      canvas.Edit.changeColor(this.draw_cnv, colorChange);
  }
  @Input()
  set colorFillChange(colorChange: { fillCheck: boolean; fillColor: string; }) {
    if(colorChange) {
      console.log(colorChange);
      if(colorChange['fillCheck']) 
        canvas.Edit.changeColorFill(this.draw_cnv, colorChange['fillColor']); 
      else
        canvas.Edit.changeColorFill(this.draw_cnv, "transparent"); 
    } 
  }
  /* Drawing Tools */
  @Input()
  set selectEvent(selectEvent: Event) {
    if(selectEvent) {
      this.s = "Select";
      this.draw();
    }
  }
  @Input()
  set panningEvent(panningEvent: Event) {
    if(panningEvent) {
      this.s = "Pan";
      this.draw();
    }
  }
  @Input()
  set pencilEvent(pencilEvent: Event) {
    if(pencilEvent) {
      this.s = "Pencil";
      this.draw();
    }
  }
  @Input()
  set eraseEvent(eraseEvent: Event) {
    if(eraseEvent) { 
      this.s = "Erase";
      this.storeWidth();
      this.draw();
    }
  }
  @Input()
  set textEvent(textEvent: Event) {
    if(textEvent) {
      this.s = "Text";
      this.draw();
    }
  }
  /* Shapes Input */
  @Input()
  set lineEvent(lineEvent: Event) {
    if(lineEvent) {
      this.s = 'Line';
      this.draw();
    }     
  }
  @Input()
  set triEvent(triEvent: Event) {
    if(triEvent) {
      this.s = 'Tri';
      this.draw();
    }
  }
  @Input()
  set rhomboidEvent(rhomboidEvent: Event) {
    if(rhomboidEvent) {
      this.s = 'Rhomboid';
      this.draw();
    }
  }
  @Input()
  set rectEvent(rectEvent: Event) {
    if(rectEvent) {
      this.s = 'Rect';
      this.draw();
    }
  }
  @Input()
    set rhombusEvent(rhombusEvent: Event) {
      if(rhombusEvent) {
        this.s = 'Rhombus';
        this.draw();
      }
  }
  @Input()
    set trapezoidEvent(trapezoidEvent: Event) {
      if(trapezoidEvent) {
        this.s = 'Trape';
        this.draw();
      }
  } 
  @Input()
    set pentEvent(pentEvent: Event) {
      if(pentEvent) {
        this.s = 'Pent';
        this.draw();
      }
  }  
  @Input()
    set hexEvent(hexEvent: Event) {
      if(hexEvent) {
        this.s = 'Hex';
        this.draw();
      }
  }  
  @Input()
    set heptEvent(heptEvent: Event) {
      if(heptEvent) {
        this.s = 'Hept';
        this.draw();
      }
  } 
  @Input()
    set circEvent(circEvent: Event) {
      if(circEvent) {
        this.s = 'Circ';
        this.draw();
      }
  }  
  @Input()
    set elliEvent(elliEvent: Event) {
      if(elliEvent) {
        this.s = 'Elli';
        this.draw();
      }
  }  
  @Input()
    set starEvent(starEvent: Event) {
      if(starEvent) {
        this.s = 'Star';
        this.draw();
      } 
  }  
  @Input()
    set heartEvent(heartEvent: Event) {
      if(heartEvent) {
        this.s = 'Heart';
        this.draw();
      }
  } 
  /* Nav bar */
  @Input()
  set createCanvasEvent(createCanvasEvent: Event) {
    if(createCanvasEvent) {
      let newPage = this.draw_cnv.cloneNode() as HTMLCanvasElement;
      var ctx = newPage?.getContext("2d");
      if(ctx) {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "transparent";
        ctx.font = "25px Arial";
      }
      this.draw_cnv_list.push(newPage);
    }
  }   
  @Input()
  set changeCanvasEvent(changeCanvas: number) {
    if(changeCanvas) {
      this.draw_cnv?.parentElement?.replaceChild(this.draw_cnv_list[changeCanvas], this.draw_cnv);
      this.draw_cnv = this.draw_cnv_list[changeCanvas];
    }
  }  

  constructor() { }

  ngOnInit(): void {
    this.draw_cnv_list = Array.from(document.getElementsByTagName("canvas"));
    this.grid_cnv = this.draw_cnv_list[0];
    this.draw_cnv = this.draw_cnv_list[1];
    var ctx = this.draw_cnv?.getContext("2d");
    if(ctx) {
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "black";
      ctx.fillStyle = "transparent";
      ctx.font = "25px Arial";
      this.undoStack = [ctx.getImageData(0,0,this.draw_cnv.width,this.draw_cnv.height)];
    }
    this.redoStack = [];
    this.data = []; this.dataRedo = [];
    this.text = []; this.line = []; this.polygon = []; this.closedShape = [];
    this.gridShown = true;
    canvas.Edit.drawGrid(this.grid_cnv);
    this.draw();
  }

  storeWidth() {
    if(this.draw_cnv) {
      var ctx = this.draw_cnv.getContext("2d");
      if(ctx) {
        this.line_width = ctx.lineWidth;
        return this.line_width;
      }
    } 
    return 0;
  }

  //activates the menu with the coordinates
  onrightClick(event: any){
    event.preventDefault();
    this.contextmenuX = event.offsetX;
    this.contextmenuY = event.offsetY;
    this.contextmenu = true;
  }
  //disables the menu
  disableContextMenu(){
    this.contextmenu = false;
  }
  assignSelect(select: any) {
    this.select = { Type: select.Type, Shape: select.Shape };
    if(this.s==='Select' && this.select.Type!=='' && this.select.Shape!==null) {
      this.checkSelect(this.select.Type);
    }
  }
  checkSelect(s:string) {
    var ctx = this.draw_cnv.getContext("2d");
    
    const Copy = () => {
      console.log(this.data,"before");
      var offset = 50;
      console.log(this.select.Shape);
      if(this.select.Shape && ctx) {
        ctx.clearRect(0, 0, this.draw_cnv.width, this.draw_cnv.height);
        let shape = this.select.Shape.clone();
        if(this.select.Shape?.name==='Triangle'||
                this.select.Shape?.name==='Rhomboid'||
                this.select.Shape?.name==='Rectangle'||
                this.select.Shape?.name==='Trapezoid'||
                this.select.Shape?.name==='Polygonal4'||
                this.select.Shape?.name==='Polygonal5'||
                this.select.Shape?.name==='Polygonal6'||
                this.select.Shape?.name==='Polygonal7') {
          if(shape.points) {
            for(let i=0; i<shape.points.length; i++) {
              shape.points[i].x += offset; 
              shape.points[i].y += offset; 
            }
          }
          console.log("point",shape);
        } else if(this.select.Shape instanceof shapes.ClosedShape) {
          shape = this.select.Shape.clone();
          if(shape.center) {
            shape.center.x += offset; 
            shape.center.y += offset; 
          }
        }/* else if(this.select.Shape instanceof shapes.LineSegment) {
          shape = this.select.Shape.clone();
          if(shape.point1 && shape.point2) {
            shape.point1.x += offset; 
            shape.point1.y += offset; 
            shape.point2.x += offset; 
            shape.point2.y += offset; 
          }
        } else if(this.select.Shape instanceof shapes.Text) {
          shape = this.select.Shape.clone();
          if(shape.bottomLeft) {
            shape.bottomLeft.x += offset; 
            shape.bottomLeft.y += offset; 
          }
        }*/
        console.log(shape);
        if(shape)
          this.data.push(shape);
          console.log(this.data,"after");
        // draw canvas
        for(let i=0; i<this.data.length; i++) 
          this.data[i].draw(ctx);//
      }
    }
    const Delete = () => {
      if(this.select.Shape && ctx) {
        this.data = this.data.filter((item) => {
          return item !== this.select.Shape;
        });
        ctx.clearRect(0, 0, this.draw_cnv.width, this.draw_cnv.height);
        // draw canvas
        for(let i=0; i<this.data.length; i++) 
          this.data[i].draw(ctx);//
      }
    }
    const LineColor = () => {
      if(this.select.Shape && ctx) {
        this.data = this.data.filter((item) => {
          return item !== this.select.Shape;
        });
        ctx.clearRect(0, 0, this.draw_cnv.width, this.draw_cnv.height);
        this.select.Shape.lineColor = String(ctx.strokeStyle);
        this.data.push(this.select.Shape);
        // draw canvas
        for(let i=0; i<this.data.length; i++) 
          this.data[i].draw(ctx);//
      }
    }
    const FillColor = () => {
      if(this.select.Shape && ctx) {
        this.data = this.data.filter((item) => {
          return item !== this.select.Shape;
        });
        ctx.clearRect(0, 0, this.draw_cnv.width, this.draw_cnv.height);
        var shape = this.select.Shape as shapes.ClosedShape;
        shape.fillColor = String(ctx.fillStyle);
        this.data.push(shape);
        // draw canvas
        for(let i=0; i<this.data.length; i++) 
          this.data[i].draw(ctx);//
      }
    }

    switch(s){
      case 'Copy': Copy(); break; 
      case 'Delete':  Delete(); break;
      case 'Line color': LineColor(); break;
      case 'Fill color': FillColor(); break;  
    }
  }


  draw(){
    let Data = ''; 
    let x = 0; let y = 0;
    var old: any = null;
    var dragStart: any;
    var dragEnd: any;
    var m = [1, 0, 0, 1, 0, 0];
    var cnv: HTMLCanvasElement;
    var ctx: any;
    var line_width: number | null = this.line_width;
    cnv = this.draw_cnv;
    ctx = cnv.getContext("2d");
    Data = ctx.getImageData(0, 0, cnv.width, cnv.height);  

    cnv.addEventListener('mousedown', e => {
      cnv = this.draw_cnv;
      ctx = cnv.getContext("2d");
      Data = ctx.getImageData(0, 0,cnv.width, cnv.height); 
      x = e.offsetX;
      y = e.offsetY;
      this.isDrawing = true;
      if(this.s==='Erase') {
        old = { x: e.offsetX, y: e.offsetY };
      } else if(this.s==='Pan') {
        var cit = transformPoint(e.pageX, e.pageY);
        dragStart = {
          x: cit.x - cnv.offsetLeft,
          y: cit.y - cnv.offsetTop
        };
      } 
    });   
   
    cnv.addEventListener('mousemove', e => {
      cnv = this.draw_cnv;
      ctx = cnv.getContext("2d");
      if (this.isDrawing === true) {
        if(this.s===''||this.s==='Pencil') {
          drawing.draw.Line(ctx, x, y, e.offsetX, e.offsetY);
          x = e.offsetX;
          y = e.offsetY;
        } else if(this.s==='Erase') {
          x = e.offsetX;
          y = e.offsetY;
          Erase(x, y);
        } else if(this.s==='Select' && this.select.Type!=='' && this.select.Shape!==null) {
          checkSelectMove(this.select.Type, x, y, e.offsetX, e.offsetY);
        } else if(this.s==='Pan') {
          var cit = transformPoint(e.pageX, e.pageY);
          dragEnd = {
            x: cit.x - cnv.offsetLeft,
            y: cit.y - cnv.offsetTop
          };
          Pan(dragStart, dragEnd);
          dragStart = dragEnd;
        } else {
          if(x!==e.offsetX && y!==e.offsetY)
            checkDraw(this.s, x, y, e.offsetX, e.offsetY);
        }
      }
    });
   
    cnv.addEventListener('mouseup', e => {
      cnv = this.draw_cnv;
      ctx = cnv.getContext("2d");
      var shape: shapes.Shape | null = null;
      if (this.isDrawing === true) {
        if(this.s===''||this.s==='Pencil'){
          drawing.draw.Line(ctx, x, y, e.offsetX, e.offsetY);
        } else if(this.s==='Erase'||this.s==='Pan') {
        } else if(this.s==='Select' && this.select.Type!=='' && this.select.Shape!==null) {
          checkSelectMove(this.select.Type, x, y, e.offsetX, e.offsetY);
        } else {
          if(x!==e.offsetX && y!==e.offsetY)
            shape = checkDraw(this.s, x, y, e.offsetX, e.offsetY);
        }
        x = 0;
        y = 0;
        this.isDrawing = false;
        if(shape)
          this.data.push(shape); //
        this.undoStack.push(ctx.getImageData(0, 0,cnv.width, cnv.height)); //
      }     
    });

    const checkSelectMove =  (s:string, x1:any, y1:any, x2:any, y2:any) => {
      if (this.isDrawing) {
        ctx.putImageData(Data, 0, 0);
      }
      if(s==='Move')
        return Move(x1,y1,x2,y2);
      else if(s==='Resize')
        return Resize(x1,y1,x2,y2);
      return null;
    }
    
    const Move = (x1:any, y1:any, x2:any, y2:any) => {
      let offset = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      if(this.select.Shape && ctx) {
        ctx.clearRect(0, 0, this.draw_cnv.width, this.draw_cnv.height);
        if(this.select.Shape instanceof shapes.Polygon) {
          if(this.select.Shape.points) {
            for(let i=0; i<this.select.Shape.points.length; i++) {
              this.select.Shape.points[i].x += offset; 
              this.select.Shape.points[i].y += offset; 
            }
          }
        } else if(this.select.Shape instanceof shapes.ClosedShape) {
          if(this.select.Shape.center) {
            this.select.Shape.center.x += offset; 
            this.select.Shape.center.y += offset; 
          }
        } else if(this.select.Shape instanceof shapes.LineSegment) {
          if(this.select.Shape.point1 && this.select.Shape.point2) {
            this.select.Shape.point1.x += offset; 
            this.select.Shape.point1.y += offset; 
            this.select.Shape.point2.x += offset; 
            this.select.Shape.point2.y += offset; 
          }
        } else if(this.select.Shape instanceof shapes.Text) {
          if(this.select.Shape.bottomLeft) {
            this.select.Shape.bottomLeft.x += offset; 
            this.select.Shape.bottomLeft.y += offset; 
          }
        }
        this.data.push(this.select.Shape);
        // draw canvas
        for(let i=0; i<this.data.length; i++) 
          this.data[i].draw(ctx);//
      }
    }
    const Resize = (x1:any, y1:any, x2:any, y2:any) => {

    }
  

    const checkDraw =  (s:string, x1:any, y1:any, x2:any, y2:any) => {
      if (this.isDrawing) {
        ctx.putImageData(Data, 0, 0);
      }
      switch(s){
        case 'Text': var text = drawing.draw.addText(ctx,x1,y1,x2,y2);
                     this.text.push(text);
        return text;
        case 'Line': var line = drawing.draw.Line(ctx,x1,y1,x2,y2);
                     this.line.push(line);
        return line; 
        case 'Tri': var triangle = drawing.draw.Triangle(ctx,x1,y1,x2,y2);
                    this.polygon.push(triangle);
        return triangle;
        case 'Rhomboid': var rhomboid = drawing.draw.Rhomboid(ctx,x1,y1,x2,y2);
                         this.polygon.push(rhomboid);
        return rhomboid; 
        case 'Rect': var rectangle = drawing.draw.Rectangle(ctx,x1,y1,x2,y2);
                     this.polygon.push(rectangle);
        return rectangle; 
        case 'Trape': var trapezoid = drawing.draw.Trapezoid(ctx,x1,y1,x2,y2);
                      this.polygon.push(trapezoid);
        return trapezoid;
        case 'Rhombus': var rhombous = drawing.draw.Polygonal(ctx,x1,y1,x2,y2,4);
                        this.polygon.push(rhombous);
        return rhombous;
        case 'Pent': var pentagon = drawing.draw.Polygonal(ctx,x1,y1,x2,y2,5);
                     this.polygon.push(pentagon);
        return pentagon;
        case 'Hex': var hexagon = drawing.draw.Polygonal(ctx,x1,y1,x2,y2,6);
                    this.polygon.push(hexagon);
        return hexagon; 
        case 'Hept': var heptagon = drawing.draw.Polygonal(ctx,x1,y1,x2,y2,7);
                     this.polygon.push(heptagon);
        return heptagon; 
        case 'Circ': var circle = drawing.draw.Circle(ctx,x1,y1,x2,y2); 
                     this.closedShape.push(circle);
        return circle;   
        case 'Elli': var ellipse = drawing.draw.Ellipse(ctx,x1,y1,x2,y2);  
                     this.closedShape.push(ellipse);
        return ellipse;
        case 'Star': var star = drawing.draw.Star(ctx,x1,y1,x2,y2);  
                     this.closedShape.push(star);
        return star;  
        case 'Heart': var heart = drawing.draw.Heart(ctx,x1,y1,x2,y2);  
                      this.closedShape.push(heart);
        return heart;   
      }
      return null;
    }

    function transformPoint(px: any, py:any) {
      var x = px;
      var y = py;
      px = x * m[0] + y * m[2] + m[4];
      py = x * m[1] + y * m[3] + m[5];
      return {
        x: px,
        y: py
      }
    }
    
    function matrixTranslate(x: any, y: any) {
      m[4] += m[0] * x + m[2] * y;
      m[5] += m[1] * x + m[3] * y;
    }

    const Pan = (dragStart:any, dragEnd: any) => {
      matrixTranslate(dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
      ctx.setTransform(m[0],0,0,m[3], dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
      if(cnv) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.restore();
      }
      // draw canvas
      for(let i=0; i<this.data.length; i++) {
        this.data[i].draw(ctx);//
      }
      ctx.translate(dragStart.x - dragEnd.x, dragStart.y - dragEnd.y);
    }

    function Erase(x:any, y:any) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.lineWidth = 20;
      ctx.beginPath();
      if(old)
        ctx.moveTo(old.x, old.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
      ctx.lineWidth = line_width;
      old = {x: x, y: y};
    }
  } 

}
