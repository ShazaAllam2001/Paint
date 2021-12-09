import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  currWidth = 1150;
  currHeight = 490;
  grid_cnv: HTMLCanvasElement | null = null;
  draw_cnv: HTMLCanvasElement | null = null;

  
  @Input()
  set lineEvent(lineEvent: Event) {
    if(lineEvent) 
      this.drawLine();
  }
  @Input()
  set triEvent(triEvent: Event) {
    if(triEvent) 
      this.drawTriangle();
  }
  @Input()
  set rhomboidEvent(rhomboidEvent: Event) {
    if(rhomboidEvent)
      this.drawRhomboid();
  }
  @Input()
  set rectEvent(rectEvent: Event) {
    if(rectEvent) 
      this.drawRect();
  }

  constructor() { }

  ngOnInit(): void {
    var cnv = document.getElementsByTagName("canvas");
    this.draw_cnv = cnv[0];
    this.grid_cnv = cnv[1];
    this.drawGrid();
  }

  drawGrid() {
    var ctx;
    ctx = this.grid_cnv?.getContext("2d");
    /* small scale */
    // vertical lines
    for(var i=10; i<this.currWidth; i+=10) {
      if(ctx) {
        ctx.moveTo(i,0);
        ctx.lineTo(i,this.currHeight);
        ctx.strokeStyle = "#E8E8E8";
        ctx.stroke();
      }
    }
    // horizontal lines
    for(var i=10; i<this.currHeight; i+=10) {
      if(ctx) {
        ctx.moveTo(0,i);
        ctx.lineTo(this.currWidth,i);
        ctx.strokeStyle = "#E8E8E8";
        ctx.stroke();
      }
    }

    ctx?.beginPath();
    /* large scale */
    // vertical lines
    for(var j=50; j<this.currWidth; j+=50) {
      if(ctx) {
        ctx.moveTo(j,0);
        ctx.lineTo(j,this.currHeight);
        ctx.strokeStyle = "#A0A0A0";
        ctx.stroke();
      }
    }
    // horizontal lines
    for(var j=50; j<this.currHeight; j+=50) {
      if(ctx) {
        ctx.moveTo(0,j);
        ctx.lineTo(this.currWidth,j);
        ctx.strokeStyle = "#A0A0A0";
        ctx.stroke();
      }
    }
    ctx?.closePath();
  }

  drawLine() {
    var ctx = this.draw_cnv?.getContext("2d");
    ctx?.beginPath();
    if(ctx) {
      ctx.moveTo(this.currWidth/2-60,this.currHeight/2-60);
      ctx.lineTo(this.currWidth/2+60,this.currHeight/2+60);
      ctx.stroke();
    }
    ctx?.closePath();
  }
  drawTriangle() {
    var ctx = this.draw_cnv?.getContext("2d");
    ctx?.beginPath();
    if(ctx) {
      ctx.moveTo(this.currWidth/2, this.currHeight/2-70);
      ctx.lineTo(this.currWidth/2-100, this.currHeight/2+70);
      ctx.lineTo(this.currWidth/2+100, this.currHeight/2+70);
      ctx.lineTo(this.currWidth/2, this.currHeight/2-70);
      ctx.stroke();
    }
    ctx?.closePath();
  }
  drawRhomboid() {
    var ctx = this.draw_cnv?.getContext("2d");
    ctx?.beginPath();
    if(ctx) {
      ctx.moveTo(this.currWidth/2-75, this.currHeight/2-75);
      ctx.lineTo(this.currWidth/2-150, this.currHeight/2+75);
      ctx.lineTo(this.currWidth/2+75, this.currHeight/2+75);
      ctx.lineTo(this.currWidth/2+150, this.currHeight/2-75);
      ctx.lineTo(this.currWidth/2-75, this.currHeight/2-75);
      ctx.stroke();
    }
    ctx?.closePath();
  }
  drawTrapezoid() {
    var ctx = this.draw_cnv?.getContext("2d");
    ctx?.beginPath();
    if(ctx) {
      ctx.moveTo(this.currWidth/2-75, this.currHeight/2-75);
      ctx.lineTo(this.currWidth/2-125, this.currHeight/2+75);
      ctx.lineTo(this.currWidth/2+50, this.currHeight/2+75);
      ctx.lineTo(this.currWidth/2, this.currHeight/2-75);
      ctx.lineTo(this.currWidth/2-75, this.currHeight/2-75);
      ctx.stroke();
    }
    ctx?.closePath();
  }
  drawRect() {
    var ctx = this.draw_cnv?.getContext("2d");
    ctx?.beginPath();
    if(ctx) {
      ctx.strokeRect(this.currWidth/2-75, this.currHeight/2-75, 250, 150);
    }
    ctx?.closePath();
  }

}
