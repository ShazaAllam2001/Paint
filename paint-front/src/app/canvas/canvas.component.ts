import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  currWidth = 1110;
  currHeight = 485;

  constructor() {
  }

  ngOnInit(): void {
    this.drawGrid();
  }

  drawGrid() {
    var cnv: HTMLCanvasElement | null;
    var ctx;
    cnv = document.getElementsByTagName("canvas")[0];
    ctx = cnv?.getContext("2d");
    /* small scale */
    // vertical lines
    for(var i=10; i<this.currWidth; i+=10) {
      if(ctx) {
        ctx.moveTo(i,0);
        ctx.lineTo(i,this.currHeight);
        ctx.strokeStyle = "#F0F0F0";
        ctx.stroke();
      }
    }
    // horizontal lines
    for(var i=10; i<this.currHeight; i+=10) {
      if(ctx) {
        ctx.moveTo(0,i);
        ctx.lineTo(this.currWidth,i);
        ctx.strokeStyle = "#F0F0F0";
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
  }

}
