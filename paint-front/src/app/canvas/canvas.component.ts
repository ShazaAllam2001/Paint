import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  grid_cnv: HTMLCanvasElement | null = null;
  draw_cnv: HTMLCanvasElement | null = null;
  ctx: any = null;
  line_width: number = 1.5;
  isDrawing: boolean = false;
  s: string = '';
  data: any = null;
  dash: number[] = [0, 5, 10, 15];

  /* Styling */
  @Input()
  set widthChange(widthChange: string) {
    if(widthChange) 
      this.changeWidth(widthChange);
  }
  @Input()
  set dashChange(dashChange: string) {
    if(dashChange) 
      this.changeDash(dashChange);
  }
  @Input()
  set colorChange(colorChange: string) {
    if(colorChange) 
      this.changeColor(colorChange);
  }
  @Input()
  set colorFillChange(colorFillChange: string) {
    if(colorFillChange) 
      this.changeColorFill(colorFillChange);
  }
  /* Tools */
  @Input()
  set pencilEvent(pencilEvent: Event) {
    if(pencilEvent) {
      this.s = "Pencil";
      this.draw(this.s);
    }
  }
  @Input()
  set eraseEvent(eraseEvent: Event) {
    if(eraseEvent) { 
      this.s = "Erase";
      this.storeWidth();
      this.draw(this.s);
    }
  }
  @Input()
  set textEvent(textEvent: Event) {
    if(textEvent) {
      this.s = "Text";
      this.draw(this.s);
    }
  }
  /* Shapes Input */
  @Input()
  set lineEvent(lineEvent: Event) {
    if(lineEvent) {
      this.s = 'Line';
      this.draw(this.s);
    }     
  }
  @Input()
  set triEvent(triEvent: Event) {
    if(triEvent) {
      this.s = 'Tri';
      this.draw(this.s);
    }
  }
  @Input()
  set rhomboidEvent(rhomboidEvent: Event) {
    if(rhomboidEvent) {
      this.s = 'Rhomboid';
      this.draw(this.s);
    }
  }
  @Input()
  set rectEvent(rectEvent: Event) {
    if(rectEvent) {
      this.s = 'Rect';
      this.draw(this.s);
    }
  }
  @Input()
    set rhombusEvent(rhombusEvent: Event) {
      if(rhombusEvent) {
        this.s = 'Rhombus';
        this.draw(this.s);
      }
  }
  @Input()
    set trapezoidEvent(trapezoidEvent: Event) {
      if(trapezoidEvent) {
        this.s = 'Trape';
        this.draw(this.s);
      }
  } 
  @Input()
    set pentEvent(pentEvent: Event) {
      if(pentEvent) {
        this.s = 'Pent';
        this.draw(this.s);
      }
  }  
  @Input()
    set hexEvent(hexEvent: Event) {
      if(hexEvent) {
        this.s = 'Hex';
        this.draw(this.s);
      }
  }  
  @Input()
    set heptEvent(heptEvent: Event) {
      if(heptEvent) {
        this.s = 'Hept';
        this.draw(this.s);
      }
  } 
  @Input()
    set circEvent(circEvent: Event) {
      if(circEvent) {
        this.s = 'Circ';
        this.draw(this.s);
      }
  }  
  @Input()
    set elliEvent(elliEvent: Event) {
      if(elliEvent) {
        this.s = 'Elli';
        this.draw(this.s);
      }
  }  
  @Input()
    set starEvent(starEvent: Event) {
      if(starEvent) {
        this.s = 'Star';
        this.draw(this.s);
      } 
  }  
  @Input()
    set heartEvent(heartEvent: Event) {
      if(heartEvent) {
        this.s = 'Heart';
        this.draw(this.s);
      }
  }    

  constructor() { }

  ngOnInit(): void {
    var cnv = document.getElementsByTagName("canvas");
    this.draw_cnv = cnv[0];
    this.grid_cnv = cnv[1];
    this.ctx = this.draw_cnv.getContext("2d");
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = "black";
    this.ctx.fillStyle = "black";
    this.ctx.font = "25px Arial";
    this.drawGrid();
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
  changeWidth(width: string) {
    var ctx = this.draw_cnv?.getContext("2d");
    if(ctx) 
      ctx.lineWidth = parseFloat(width);
    console.log(width);
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
    console.log(color);
  }

  draw(s:string){
    let isDrawing = false;
    let data = ''; let x = 0; let y = 0;
    var cnv: HTMLCanvasElement | null;
    var ctx: any;
    var line_width: number | null = this.line_width;
    var old:any = null;
    cnv = document.getElementsByTagName("canvas")[0];
    ctx = cnv.getContext("2d");
    data = ctx.getImageData(0, 0, cnv.width, cnv.height);
   
    cnv.addEventListener('mousedown', e => {
      cnv = document.getElementsByTagName("canvas")[0];
      ctx = cnv.getContext("2d");
      data = ctx.getImageData(0, 0,cnv.width, cnv.height); 
      x = e.offsetX;
      y = e.offsetY;
      isDrawing = true;
      if(s === 'Erase') {
        old = {x: e.offsetX, y: e.offsetY};
      }
    });   
   
    cnv.addEventListener('mousemove', e => {
      cnv = document.getElementsByTagName("canvas")[0];
      ctx = cnv.getContext("2d");
      if (isDrawing === true) {
        if(s===''||this.s==='Pencil') {
          drawLine(x, y, e.offsetX, e.offsetY);
          x = e.offsetX;
          y = e.offsetY;
        } else if(this.s==='Erase') {
          x = e.offsetX;
          y = e.offsetY;
          Erase(x, y);
        } else {
          check(s, x, y, e.offsetX, e.offsetY);
        }
      }
    });
   
    window.addEventListener('mouseup', e => {
      cnv = document.getElementsByTagName("canvas")[0];
      ctx = cnv.getContext("2d");
      if (isDrawing === true) {
        if(s===''||this.s==='Pencil'){
          drawLine(x, y, e.offsetX, e.offsetY);
        } else if (this.s=='Erase') {
        } else{
          check(s, x, y, e.offsetX, e.offsetY);
        }
        x = 0;
        y = 0;
        isDrawing = false;
      }     
    });

    function check (s:string, x1:any, y1:any, x2:any, y2:any){
      if (isDrawing) {
        ctx.putImageData(data, 0, 0);}
    
      switch(s){
        case 'Text': addText(x1,y1,x2,y2);
          break;
        case 'Line': Line(x1,y1,x2,y2);
          break; 
        case 'Tri': Triangle(x1,y1,x2,y2);
          break;
        case 'Rhomboid': Rhomboid(x1,y1,x2,y2);
          break; 
        case 'Rect': Rectangle(x1,y1,x2,y2);
          break;
        case 'Rhombus': polygonal(x1,y1,x2,y2,4);
          break;
        case 'Pent': polygonal(x1,y1,x2,y2,5);
          break;
        case 'Hex': polygonal(x1,y1,x2,y2,6);
          break; 
        case 'Hept': polygonal(x1,y1,x2,y2,7);
          break;  
        case 'Circ': Circle(x1,y1,x2,y2);
          break;   
        case 'Elli': Ellipse(x1,y1,x2,y2);
          break;  
        case 'Star': Star(x1,y1,x2,y2);
          break;  
        case 'Heart': Heart(x1,y1,x2,y2);
          break;    
      }
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
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillText("Text", x1, y1, maxWidth);
    }

    function Line(x1:any, y1:any, x2:any, y2:any) {
      if (isDrawing) {
        ctx.putImageData(data, 0, 0);
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }
   
    function Triangle(x1:any, y1:any, x2:any, y2:any) {
      let first = Math.abs (x2 - x1) * 2;
      ctx.globalCompositeOperation = 'source-over';
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2 - first, y2);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }
   
    function polygonal(x1:any, y1:any, x2:any, y2:any, n:any) {
      let r = Math.abs(x1 - x2);
      let angle = (2*Math.PI)/n;
      ctx.globalCompositeOperation = 'source-over';
      for(let i=0 ; i<n; i++){
        const a = i * angle ;
        ctx.lineTo(x1 + r * Math.cos(a), y1 + r * Math.sin(a));
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }
   
    function Rhomboid(x1:any, y1:any, x2:any, y2:any) {
      let w = Math.abs(x1 - x2);
      let h = Math.abs(y1 - y2);
      ctx.globalCompositeOperation = 'source-over';
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 + w, y1);
      ctx.lineTo(x1 + w + h * Math.cos(45), y1 + h);
      ctx.lineTo(x1 + h * Math.cos(45), y1 + h);
      ctx.lineTo(x1, y1);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }

    function Rectangle(x1:any, y1:any, x2:any, y2:any) {
      let w = Math.abs(x1 - x2);
      let h = Math.abs(y1 - y2);
      ctx.globalCompositeOperation = 'source-over';
      ctx.closePath();
      ctx.strokeRect(x1, y1, w, h);
      ctx.beginPath();  
    }
   
    function Circle(x1:any ,y1:any, x2:any, y2:any) {
      let r = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      ctx.globalCompositeOperation = 'source-over';
      ctx.arc(x1, y1, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }
   
    function Ellipse(x1:any, y1:any, x2:any, y2:any) { 
      let r1 = Math.abs(x1 - x2);
      let r2 = Math.abs(y1 - y2);
      ctx.globalCompositeOperation = 'source-over';
      ctx.ellipse(x1, y1, r1, r2, Math.PI, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }

    function Star(x1:any, y1:any, x2:any, y2:any) {
      var rot = Math.PI/2*3;
      let outerRadius = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      let innerRadius = outerRadius*(2/3);
      var x = x1; var y = y1;
      var step = Math.PI/5;
      ctx.globalCompositeOperation = 'source-over';
      ctx.moveTo(x1, y1-outerRadius);
      for(var i=0; i<5; i++){
        x = x1 + Math.cos(rot)*outerRadius;
        y = y1 + Math.sin(rot)*outerRadius;
        ctx.lineTo(x,y);
        rot += step;
        
        x = x1 + Math.cos(rot)*innerRadius;
        y = y1 + Math.sin(rot)*innerRadius;
        ctx.lineTo(x,y);
        rot += step;
      }
      ctx.lineTo(x1, y1-outerRadius);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }

    function Heart(x1:any, y1:any, x2:any, y2:any) {
      var x = x1;
      var y = y1;
      var w = Math.abs(x1 - x2) ;
      var h = Math.abs(y1 - y2);
      var topCurveHeight = h * 0.3;
      ctx.globalCompositeOperation = 'source-over';
      ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        x, y, 
        x - w / 2, y, 
        x - w / 2, y + topCurveHeight
      );

      // bottom left curve
      ctx.bezierCurveTo(
        x - w / 2, y + (h + topCurveHeight) / 2, 
        x, y + (h + topCurveHeight) / 2, 
        x, y + h
      );
 
      // bottom right curve
      ctx.bezierCurveTo(
        x, y + (h + topCurveHeight) / 2, 
        x + w / 2, y + (h + topCurveHeight) / 2, 
        x + w / 2, y + topCurveHeight
      );
  
      // top right curve
      ctx.bezierCurveTo(
        x + w / 2, y, 
        x, y, 
        x, y + topCurveHeight
      );
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }
   
     
  } 

}
