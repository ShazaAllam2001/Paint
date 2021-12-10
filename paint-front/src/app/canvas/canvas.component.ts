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
  isDrawing: boolean = false;
  s: string = '';
  data: any = null;

  @Input()
  set lineEvent(lineEvent: Event) {
    if(lineEvent) 
      this.s = 'Line';
      this.draw(this.s);     
  }
  /*@Input()
  set polyEvent(PolyEvent: Event) {
    if(PolyEvent) 
      this.s = 'Poly';
      this.draw(this.s);
  }*/
  @Input()
  set triEvent(triEvent: Event) {
    if(triEvent) 
      this.s = 'Tri';
      this.draw(this.s);
  }
  @Input()
  set rhomboidEvent(rhomboidEvent: Event) {
    if(rhomboidEvent)
      this.s = 'Rhomboid';
      this.draw(this.s);
  }
  @Input()
  set rectEvent(rectEvent: Event) {
    if(rectEvent) 
      this.s = 'Rect';
      this.draw(this.s);
  }
  @Input()
    set rhombusEvent(rhombusEvent: Event) {
      if(rhombusEvent) 
        this.s = 'Rhombus';
        this.draw(this.s);
  }
  @Input()
    set trapezoidEvent(trapezoidEvent: Event) {
      if(trapezoidEvent) 
        this.s = 'Trape';
        this.draw(this.s);
  } 
  @Input()
    set pentEvent(pentEvent: Event) {
      if(pentEvent) 
        this.s = 'Pent';
        this.draw(this.s);
  }  
  @Input()
    set hexEvent(hexEvent: Event) {
      if(hexEvent) 
        this.s = 'Hex';
        this.draw(this.s);
  }  
  @Input()
    set heptEvent(heptEvent: Event) {
      if(heptEvent) 
        this.s = 'Hept';
        this.draw(this.s);
  } 
  @Input()
    set circEvent(circEvent: Event) {
      if(circEvent) 
        this.s = 'Circ';
        this.draw(this.s);
  }  
  @Input()
    set elliEvent(elliEvent: Event) {
      if(elliEvent) 
        this.s = 'Elli';
        this.draw(this.s);
  }    

  constructor() { }

  ngOnInit(): void {
    var cnv = document.getElementsByTagName("canvas");
    this.draw_cnv = cnv[0];
    this.grid_cnv = cnv[1];
    this.ctx = this.draw_cnv.getContext("2d");
    if(this.ctx)
      this.ctx.strokeStyle = "black";
    this.drawGrid();
    //document.addEventListener("mousedown", function(event) => {

    //});
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

  draw(s:string){
    let isDrawing = false;
    let data = ''; let x=0; let y=0;
    var cnv: HTMLCanvasElement | null;
    var ctx: any;
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
    });   
   
    cnv.addEventListener('mousemove', e => {
      if (isDrawing === true) {
        check(s, x, y, e.offsetX, e.offsetY);
      }
    });
   
    window.addEventListener('mouseup', e => {
      if (isDrawing === true) {
        check(s, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
      }
    });

    function check (s:string,x1: any,y1: any,x2: any, y2:any){
      if (isDrawing) {
        ctx.putImageData(data, 0, 0);}
    
      switch(s){
        case 'Line': Line(x1,y1,x2,y2);
          break;
        case 'Poly': ;
          break ;  
        case 'Tri': Triangle(x1,y1,x2,y2);
          break ;
        case 'Rhomboid': ;
          break ; 
        case 'Rect': Rectangle(x1,y1,x2,y2);
          break ;
        case 'Rhombus': polygonal(x1,y1,x2,y2,4);
          break ;
        case 'Pent': polygonal(x1,y1,x2,y2,5);
          break ;
        case 'Hex': polygonal(x1,y1,x2,y2,6);
          break ; 
        case 'Hept': polygonal(x1,y1,x2,y2,7);
          break ;  
        case 'Circ': Circle(x1,y1,x2,y2);
          break ;   
        case 'Elli': Ellipse(x1,y1,x2,y2);
          break ;      
      }
    }
   
    function Line( x1: any,y1: any,x2: any, y2:any) {
      if (isDrawing) {
        ctx.putImageData(data, 0, 0);}
     
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }
   
    function Triangle(x1: any,y1: any,x2: any, y2:any) {
      let first =Math.abs (x2 - x1) * 2;
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

      for(let i=0 ; i<n; i++){
        const a = i * angle ;
        ctx.lineTo(x1 + r * Math.cos(a) , y1 + r * Math.sin(a));
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }
   
    function Rectangle(x1:any, y1:any, x2:any, y2:any) {
      let w = Math.abs(x1 - x2);
      let h = Math.abs(y1 - y2);
      ctx.closePath();
      ctx.strokeRect(x1, y1, w, h);
      ctx.beginPath();  
    }
   
    function Circle(x1:any ,y1:any, x2:any, y2:any) {
      let r = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      ctx.arc(x1, y1, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }
   
    function Ellipse(x1:any, y1:any, x2:any, y2:any) { 
      let r1 = Math.abs(x1 - x2);
      let r2 = Math.abs(y1 - y2);
      ctx.ellipse(x1, y1, r1, r2, Math.PI, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
    }
   
      /* function drawFLine(context: { beginPath: () => void; strokeStyle: any; lineWidth: number; moveTo: (arg0: any, arg1: any) => void; lineTo: (arg0: any, arg1: any) => void; stroke: () => void; closePath: () => void; }, x1: number, y1: number, x2: number, y2: number) {
         context.beginPath();
         context.strokeStyle =  'red';
         context.lineWidth = 1;
         context.moveTo(x1, y1);
         context.lineTo(x2, y2);
         context.stroke();
         context.closePath();
       }
       
   */
   } 

}
