import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  currWidth = 1140;
  currHeight = 490;

  constructor() {
  }

  ngOnInit(): void {
    this.drawGrid();
  }

  drawGrid() {

    let isDrawing = false;
    let x = 0;
    let y = 0;
    var canvas: HTMLCanvasElement | null;
    var context:any;
    canvas = document.getElementsByTagName("canvas")[0];
    context = canvas.getContext("2d");
  
    for(var i=10; i<this.currWidth; i+=10) {
      if(context) {
        context.moveTo(i,0);
        context.lineTo(i,this.currHeight);
        context.strokeStyle = "#E8E8E8";
        context.stroke();
      }
    }
    // horizontal lines
    for(var i=10; i<this.currHeight; i+=10) {
      if(context) {
        context.moveTo(0,i);
        context.lineTo(this.currWidth,i);
        context.strokeStyle = "#E8E8E8";
        context.stroke();
      }
    }
    
    context.beginPath();
    /* large scale */
    // vertical lines
    for(var j=50; j<this.currWidth; j+=50) {
      if(context) {
        context.moveTo(j,0);
        context.lineTo(j,this.currHeight);
        context.strokeStyle = "#A0A0A0";
        context.stroke();
      }
    }
    // horizontal lines
    for(var j=50; j<this.currHeight; j+=50) {
      if(context) {
        context.moveTo(0,j);
        context.lineTo(this.currWidth,j);
        context.strokeStyle = "#A0A0A0";
        context.stroke();
      }
    }
    canvas.addEventListener('mousedown', e => {
      x = e.offsetX;
      y = e.offsetY;
      isDrawing = true;
    });
    
   canvas.addEventListener('mousemove', e => {
      if (isDrawing === true) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
      }
    });
    
    window.addEventListener('mouseup', e => {
      if (isDrawing === true) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
      }
    });
  
  
    function drawLine(context: { beginPath: () => void; strokeStyle: any; lineWidth: number; moveTo: (arg0: any, arg1: any) => void; lineTo: (arg0: any, arg1: any) => void; stroke: () => void; closePath: () => void; }, x1: number, y1: number, x2: number, y2: number) {
      context.beginPath();
      context.strokeStyle =  'red';
      context.lineWidth = 1;
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      context.closePath();
    }

  }

}
