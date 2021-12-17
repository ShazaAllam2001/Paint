import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import * as shapes from './shapes';

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
  s: string = '';
  dash: number[] = [0, 5, 10, 15];
  data!: shapes.Shape[]; // 
  undoStack!: ImageData[]; //
  redoStack!: ImageData[]; //

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
          this.data[i].draw(ctx);//
      }
      this.grid_cnv.width = this.grid_cnv.width*1.1;
      this.grid_cnv.height = this.grid_cnv.height*1.1;
      this.changeGrid(this.gridShown);
    }
  }
  @Input()
  set gridChange(gridChange: boolean) {
    this.gridShown = gridChange;
    this.changeGrid(gridChange);
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
      console.log(undoChange);
      var undoState = this.undoStack.pop();
      if(undoState) {
        this.redoStack.push(undoState);
        ctx.putImageData(this.undoStack[this.undoStack.length-1],0,0);
      }
    }
    this.data = []; //
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
    }
    this.data = []; //
  }
  /* Styling Box */
  @Input()
  set zoomInChange(zoomInEvent: Event) {
    if(zoomInEvent) 
      this.zoomIn();
  }
  @Input()
  set zoomOutChange(zoomOutEvent: Event) {
    if(zoomOutEvent) 
      this.zoomOut();
  }
  @Input()
  set fontChange(fontChange: string) {
      this.changeFont(fontChange);
  }
  @Input()
  set widthChange(widthChange: string) { 
      this.changeWidth(widthChange);
  }
  @Input()
  set dashChange(dashChange: string) {
      this.changeDash(dashChange);
  }
  @Input()
  set colorChange(colorChange: string) {
      this.changeColor(colorChange);
  }
  @Input()
  set colorFillChange(colorChange: { fillCheck: boolean; fillColor: string; }) {
    if(colorChange) {
      console.log(colorChange);
      if(colorChange['fillCheck']) 
        this.changeColorFill(colorChange['fillColor']); 
      else
        this.changeColorFill("transparent"); 
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
      let parent = this.draw_cnv.parentElement;
      parent?.replaceChild(this.draw_cnv_list[changeCanvas], this.draw_cnv);
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
    this.data = [];
    this.redoStack = [];
    this.gridShown = true;
    this.drawGrid();
    this.draw();
  }

  drawGrid() {
    var ctx;
    ctx = this.grid_cnv?.getContext("2d");
    /* small scale */
    // vertical lines
    if(this.grid_cnv) {
      ctx?.beginPath();
      for(var i=10; i<this.grid_cnv.width; i+=10) {
        if(ctx) {
          ctx.moveTo(i,0);
          ctx.lineTo(i,this.grid_cnv.height);
          ctx.strokeStyle = "#E8E8E8";
          ctx.stroke();
        }
      }
      // horizontal lines
      for(var i=10; i<this.grid_cnv.height; i+=10) {
        if(ctx) {
          ctx.moveTo(0,i);
          ctx.lineTo(this.grid_cnv.width,i);
          ctx.strokeStyle = "#E8E8E8";
          ctx.stroke();
        }
      }
      ctx?.closePath();
  
      ctx?.beginPath();
      /* large scale */
      // vertical lines
      for(var j=50; j<this.grid_cnv.width; j+=50) {
        if(ctx) {
          ctx.moveTo(j,0);
          ctx.lineTo(j,this.grid_cnv.height);
          ctx.strokeStyle = "#A0A0A0";
          ctx.stroke();
        }
      }
      // horizontal lines
      for(var j=50; j<this.grid_cnv.height; j+=50) {
        if(ctx) {
          ctx.moveTo(0,j);
          ctx.lineTo(this.grid_cnv.width,j);
          ctx.strokeStyle = "#A0A0A0";
          ctx.stroke();
        }
      }
      ctx?.closePath();
    }
  }
  clearGrid() {
    if(this.grid_cnv) {
      var ctx = this.grid_cnv.getContext("2d");
      if(ctx) 
        ctx.clearRect(0, 0, this.grid_cnv.width, this.grid_cnv.height);
    } 
  }
  changeGrid(grid: boolean) {
    if(grid) {
      this.drawGrid();
    } else {
      this.clearGrid();
    }
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
  zoom(scale: number) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(ctx && this.draw_cnv) {
      let current_transform = ctx.getTransform();
      ctx.setTransform(1.1, 0, 0, 1.1, 0, 0);
      ctx.clearRect(0, 0, this.draw_cnv.width*scale, this.draw_cnv.height*scale);
      ctx.setTransform(current_transform);
      ctx.scale(scale, scale);
      // draw canvas
      for(let i=0; i<this.data.length; i++) 
        this.data[i].draw(ctx);//
      ctx.translate(0,0);
    }
  }
  zoomIn() {
    var scale = 1.1;
    this.zoom(scale);
  }
  zoomOut() {
    var scale = 1.0/1.1;
    this.zoom(scale);
  }
  changeFont(font: string) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(ctx) 
      ctx.font = font;
  }
  changeWidth(width: string) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(ctx) 
      ctx.lineWidth = parseFloat(width);
  }
  changeDash(dash: string) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(ctx) 
    switch(dash){
      case 'solid': ctx.setLineDash(this.dash.slice(0,1));
        break; 
      case 'dashed-1': ctx.setLineDash(this.dash.slice(1,2));
        break;
      case 'dashed-2': ctx.setLineDash(this.dash.slice(2,3));
        break; 
      case 'dashed-3': ctx.setLineDash(this.dash.slice(3,4));
        break; 
    }
  }
  changeColor(color: string) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(ctx) 
      ctx.strokeStyle = color;
  }
  changeColorFill(color: string) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(ctx) 
      ctx.fillStyle = color;
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
        old = {x: e.offsetX, y: e.offsetY};
      } else if(this.s==='Select') {

      } else if(this.s==='Pan') {
        var cit = transformPoint(e.pageX, e.pageY);
        dragStart = {
          x: cit.x - cnv.offsetLeft,
          y: cit.y - cnv.offsetTop
        }
      }
    });   
   
    cnv.addEventListener('mousemove', e => {
      cnv = this.draw_cnv;
      ctx = cnv.getContext("2d");
      if (this.isDrawing === true) {
        if(this.s===''||this.s==='Pencil') {
          drawLine(x, y, e.offsetX, e.offsetY);
          x = e.offsetX;
          y = e.offsetY;
        } else if(this.s==='Erase') {
          x = e.offsetX;
          y = e.offsetY;
          Erase(x, y);
        } else if(this.s==='Select') {

        } else if(this.s==='Pan') {
          var cit = transformPoint(e.pageX, e.pageY);
          dragEnd = {
            x: cit.x - cnv.offsetLeft,
            y: cit.y - cnv.offsetTop
          };
          Pan(dragStart, dragEnd);
          dragStart = dragEnd;
        } else {
          check(this.s, x, y, e.offsetX, e.offsetY);
        }
      }
    });
   
    cnv.addEventListener('mouseup', e => {
      cnv = this.draw_cnv;
      ctx = cnv.getContext("2d");
      var shape: shapes.Shape | null = null;
      if (this.isDrawing === true) {
        if(this.s===''||this.s==='Pencil'){
          drawLine(x, y, e.offsetX, e.offsetY);
        } else if(this.s==='Erase'||this.s==='Pan') {
        } else if(this.s==='Select') {

        } else {
          shape = check(this.s, x, y, e.offsetX, e.offsetY);
        }
        x = 0;
        y = 0;
        this.isDrawing = false;
        if(shape)
          this.data.push(shape); //
        this.undoStack.push(ctx.getImageData(0, 0,cnv.width, cnv.height)); //
      }     
    });

    const check =  (s:string, x1:any, y1:any, x2:any, y2:any) => {
      if (this.isDrawing) {
        ctx.putImageData(Data, 0, 0);
      }
      switch(s){
        case 'Text': return addText(x1,y1,x2,y2);
        case 'Line': return Line(x1,y1,x2,y2); 
        case 'Tri': return Triangle(x1,y1,x2,y2);
        case 'Rhomboid': return Rhomboid(x1,y1,x2,y2); 
        case 'Rect': return Rectangle(x1,y1,x2,y2);
        case 'Trape': return Trapezoid(x1,y1,x2,y2);
        case 'Rhombus': return polygonal(x1,y1,x2,y2,4);
        case 'Pent': return polygonal(x1,y1,x2,y2,5);
        case 'Hex': return polygonal(x1,y1,x2,y2,6); 
        case 'Hept': return polygonal(x1,y1,x2,y2,7);  
        case 'Circ': return Circle(x1,y1,x2,y2);   
        case 'Elli': return Ellipse(x1,y1,x2,y2);  
        case 'Star': return Star(x1,y1,x2,y2);  
        case 'Heart': return Heart(x1,y1,x2,y2);    
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

    function drawLine(x1:any, y1:any, x2:any, y2:any) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
    }

    function addText(x1:any, y1:any, x2:any, y2:any) {
      let maxWidth = Math.abs(x1 - x2);
      var text = new shapes.Text("Text",
                                 new shapes.Point(x1,y1),
                                 maxWidth,
                                 ctx.font,
                                 ctx.strokeStyle,
                                 ctx.lineWidth);
      text.draw(ctx);
      return text;
    }

    function Line(x1:any, y1:any, x2:any, y2:any) {
      var line = new shapes.LineSegment(new shapes.Point(x1,y1),
                                        new shapes.Point(x2,y2),
                                        ctx.strokeStyle,
                                        ctx.lineWidth);
      line.draw(ctx);
      return line;
    }
   
    function Triangle(x1:any, y1:any, x2:any, y2:any) {
      let first = Math.abs (x2 - x1) * 2;
      var points = [new shapes.Point(x1,y1),
                    new shapes.Point(x2-first,y2),
                    new shapes.Point(x2,y2)];
      var triangle = new shapes.Triangle(points,
                                         ctx.strokeStyle,
                                         ctx.lineWidth,
                                         ctx.fillStyle);
      triangle.draw(ctx);
      return triangle;
    }
   
    function polygonal(x1:any, y1:any, x2:any, y2:any, n:any) {
      let r = Math.abs(x1 - x2);
      let angle = (2*Math.PI)/n;
      var points: any = [];
      for(let i=0 ; i<n; i++){
        const a = i * angle;
        points.push(new shapes.Point(x1 + r * Math.cos(a), y1 + r * Math.sin(a)));
      }
      var polygonal = new shapes.Polygonal(points,
                                        ctx.strokeStyle,
                                        ctx.lineWidth,
                                        ctx.fillStyle);
      polygonal.draw(ctx);
      return polygonal;
    }
   
    function Rhomboid (x1:any, y1:any, x2:any, y2:any) {
      let w = Math.abs(x1 - x2);
      let h = Math.abs(y1 - y2);
      var points = [new shapes.Point(x1,y1),
                    new shapes.Point(x1 + w,y1),
                    new shapes.Point(x1 + w + h*Math.cos(45),y1+h),
                    new shapes.Point(x1 + h*Math.cos(45),y1+h)];
      var rhomboid = new shapes.Rhomboid(points,
                                        ctx.strokeStyle,
                                        ctx.lineWidth,
                                        ctx.fillStyle);
      rhomboid.draw(ctx);
      return rhomboid;
    }

    function Rectangle(x1:any, y1:any, x2:any, y2:any) {
      let h = Math.abs(y1 - y2);
      var points = [new shapes.Point(x1,y1),
                    new shapes.Point(x2,y2),
                    new shapes.Point(x2,y2+h),
                    new shapes.Point(x1,y+h)];
      var rectangle = new shapes.Rectangle(points,
                                           ctx.strokeStyle,
                                           ctx.lineWidth,
                                           ctx.fillStyle);
      rectangle.draw(ctx);
      return rectangle;
    }

    function Trapezoid(x1:any, y1:any, x2:any, y2:any) {
      let h = Math.abs(y1 - y2);
      var points = [new shapes.Point(x1,y1),
                    new shapes.Point(x2,y1),
                    new shapes.Point(x2 + h/Math.tan(45),y2),
                    new shapes.Point(x1 - h/Math.tan(45),y2)];
      var trapezoid = new shapes.Trapezoid(points,
                                           ctx.strokeStyle,
                                           ctx.lineWidth,
                                           ctx.fillStyle);
      trapezoid.draw(ctx);
      return trapezoid;
    }
   
    function Circle(x1:any ,y1:any, x2:any, y2:any) {
      let r = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      var circle = new shapes.Circle(new shapes.Point(x1,y1),
                                         r,
                                         ctx.stokeStyle,
                                         ctx.lineWidth,
                                         ctx.fillStyle);
      circle.draw(ctx);
      return circle;
    }
   
    function Ellipse(x1:any, y1:any, x2:any, y2:any) { 
      let r1 = Math.abs(x1 - x2);
      let r2 = Math.abs(y1 - y2);
      var ellipse = new shapes.Ellipse(new shapes.Point(x1,y1),
                                       r1,
                                       r2,
                                       ctx.strokeStyle,
                                       ctx.lineWidth,
                                       ctx.fillStyle);
      ellipse.draw(ctx);
      return ellipse;
    }

    function Star(x1:any, y1:any, x2:any, y2:any) {
      var outerRadius = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      var star = new shapes.Star(new shapes.Point(x1,y1),
                                 outerRadius,
                                 ctx.strokeStyle,
                                 ctx.lineWidth,
                                 ctx.fillStyle); 
      star.draw(ctx);
      return star;
    }

    function Heart(x1:any, y1:any, x2:any, y2:any) {
      var width = Math.abs(x1 - x2);
      var height = Math.abs(y1 - y2);
      var heart = new shapes.Heart(new shapes.Point(x1,y1),
                                   width,
                                   height,
                                   ctx.strokeStyle,
                                   ctx.lineWidth,
                                   ctx.fillStyle); 
      heart.draw(ctx);
      return heart;
    }
  } 

}
