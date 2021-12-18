import * as shapes from './shapes';

export class Edit {
    static drawGrid(cnv: HTMLCanvasElement) {
        var ctx;
        ctx = cnv?.getContext("2d");
        /* small scale */
        // vertical lines
        if(cnv) {
          ctx?.beginPath();
          for(var i=10; i<cnv.width; i+=10) {
            if(ctx) {
              ctx.moveTo(i,0);
              ctx.lineTo(i,cnv.height);
              ctx.strokeStyle = "#E8E8E8";
              ctx.stroke();
            }
          }
          // horizontal lines
          for(var i=10; i<cnv.height; i+=10) {
            if(ctx) {
              ctx.moveTo(0,i);
              ctx.lineTo(cnv.width,i);
              ctx.strokeStyle = "#E8E8E8";
              ctx.stroke();
            }
          }
          ctx?.closePath();
      
          ctx?.beginPath();
          /* large scale */
          // vertical lines
          for(var j=50; j<cnv.width; j+=50) {
            if(ctx) {
              ctx.moveTo(j,0);
              ctx.lineTo(j,cnv.height);
              ctx.strokeStyle = "#A0A0A0";
              ctx.stroke();
            }
          }
          // horizontal lines
          for(var j=50; j<cnv.height; j+=50) {
            if(ctx) {
              ctx.moveTo(0,j);
              ctx.lineTo(cnv.width,j);
              ctx.strokeStyle = "#A0A0A0";
              ctx.stroke();
            }
          }
          ctx?.closePath();
        }
    }
    static clearGrid(cnv: HTMLCanvasElement) {
        if(cnv) {
          var ctx = cnv.getContext("2d");
          if(ctx) 
            ctx.clearRect(0, 0, cnv.width, cnv.height);
        } 
    }
    static changeGrid(cnv: HTMLCanvasElement, grid: boolean) {
      if(grid) {
        Edit.drawGrid(cnv);
      } else {
        Edit.clearGrid(cnv);
      }
    }

    static zoom(scale: number, cnv: HTMLCanvasElement, data: shapes.Shape[]) {
        var ctx = cnv?.getContext("2d");
        if(ctx && cnv) {
          let current_transform = ctx.getTransform();
          ctx.setTransform(1.1, 0, 0, 1.1, 0, 0);
          ctx.clearRect(0, 0, cnv.width*scale, cnv.height*scale);
          ctx.setTransform(current_transform);
          ctx.scale(scale, scale);
          // draw canvas
          for(let i=0; i<data.length; i++) 
            data[i].draw(ctx);//
          ctx.translate(0,0);
        }
    }
    static zoomIn(cnv: HTMLCanvasElement, data: shapes.Shape[]) {
        var scale = 1.1;
        Edit.zoom(scale, cnv, data);
    }
    static zoomOut(cnv: HTMLCanvasElement, data: shapes.Shape[]) {
        var scale = 1.0/1.1;
        Edit.zoom(scale, cnv, data);
    }
    
    static changeFont(cnv: HTMLCanvasElement, font: string) {
        var ctx = cnv?.getContext("2d");
        if(ctx) 
          ctx.font = font;
    }

    static changeWidth(cnv: HTMLCanvasElement, width: string) {
        var ctx = cnv?.getContext("2d");
        if(ctx) 
          ctx.lineWidth = parseFloat(width);
    }

    static changeDash(cnv: HTMLCanvasElement, dash: string, dashArr: number[]) {
        var ctx = cnv?.getContext("2d");
        if(ctx) 
        switch(dash){
          case 'solid': ctx.setLineDash(dashArr.slice(0,1));
            break; 
          case 'dashed-1': ctx.setLineDash(dashArr.slice(1,2));
            break;
          case 'dashed-2': ctx.setLineDash(dashArr.slice(2,3));
            break; 
          case 'dashed-3': ctx.setLineDash(dashArr.slice(3,4));
            break; 
        }
    }

    static changeColor(cnv: HTMLCanvasElement, color: string) {
        var ctx = cnv?.getContext("2d");
        if(ctx) 
          ctx.strokeStyle = color;
    }
      
    static changeColorFill(cnv:HTMLCanvasElement, color: string) {
        var ctx = cnv?.getContext("2d");
        if(ctx) 
          ctx.fillStyle = color;
    }
    
}