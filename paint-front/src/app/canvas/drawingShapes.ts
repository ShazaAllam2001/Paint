import { HttpClient } from '@angular/common/http';
import * as shapes from './shapes';

export class draw {
    
    static addText(ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any) {
        let maxWidth = Math.abs(x1 - x2);
        var text = new shapes.Text("Text",
                                   "Text",
                                   new shapes.Point(x1,y1),
                                   maxWidth,
                                   ctx.font,
                                   String(ctx.strokeStyle),
                                   ctx.lineWidth);
        text.draw(ctx);
        return text;
    }

    static Line(ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any) {
        var line = new shapes.LineSegment("Line",
                                          new shapes.Point(x1,y1),
                                          new shapes.Point(x2,y2),
                                          String(ctx.strokeStyle),
                                          ctx.lineWidth);
        line.draw(ctx);
        return line;
    }

    static Triangle(ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any) {
        let first = Math.abs (x2 - x1) * 2;
        var points = [new shapes.Point(x1,y1),
                      new shapes.Point(x2-first,y2),
                      new shapes.Point(x2,y2)];
        var triangle = new shapes.Triangle("Triangle",
                                           points,
                                           String(ctx.strokeStyle),
                                           ctx.lineWidth,
                                           String(ctx.fillStyle));
        triangle.draw(ctx);
        return triangle;
    }

    static Polygonal(ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any, n:any) {
        let r = Math.abs(x1 - x2);
        let angle = (2*Math.PI)/n;
        var points: any = [];
        for(let i=0 ; i<n; i++){
          const a = i * angle;
          points.push(new shapes.Point(x1 + r * Math.cos(a), y1 + r * Math.sin(a)));
        }
        var polygonal = new shapes.Polygonal("Polygonal"+ n,
                                             points,
                                             String(ctx.strokeStyle),
                                             ctx.lineWidth,
                                             String(ctx.fillStyle));
        polygonal.draw(ctx);
        return polygonal;
    }

    static Rhomboid( ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any) {
        let w = Math.abs(x1 - x2);
        let h = Math.abs(y1 - y2);
        var points = [new shapes.Point(x1,y1),
                      new shapes.Point(x1 + w,y1),
                      new shapes.Point(x1 + w + h*Math.cos(45),y1+h),
                      new shapes.Point(x1 + h*Math.cos(45),y1+h)];
        var rhomboid = new shapes.Rhomboid("Rhomboid",
                                           points,
                                           String(ctx.strokeStyle),
                                           ctx.lineWidth,
                                           String(ctx.fillStyle));
        rhomboid.draw(ctx);
        return rhomboid;
    }

    static Rectangle(ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any) {
        let h = Math.abs(y1 - y2);
        var points = [new shapes.Point(x1,y1),
                      new shapes.Point(x2,y2),
                      new shapes.Point(x2,y2+h),
                      new shapes.Point(x1,y2+h)];
        var rectangle = new shapes.Rectangle("Rectangle",
                                             points,
                                             String(ctx.strokeStyle),
                                             ctx.lineWidth,
                                             String(ctx.fillStyle));
        rectangle.draw(ctx);
        return rectangle;
    }

    static Trapezoid(ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any) {
        let h = Math.abs(y1 - y2);
        var points = [new shapes.Point(x1,y1),
                      new shapes.Point(x2,y1),
                      new shapes.Point(x2 + h/Math.tan(45),y2),
                      new shapes.Point(x1 - h/Math.tan(45),y2)];
        var trapezoid = new shapes.Trapezoid("Trapezoid",
                                             points,
                                             String(ctx.strokeStyle),
                                             ctx.lineWidth,
                                             String(ctx.fillStyle));
        trapezoid.draw(ctx);
        return trapezoid;
    }

    static Circle(ctx: CanvasRenderingContext2D, x1:any ,y1:any, x2:any, y2:any) {
        let r = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var circle = new shapes.Circle("Circle",
                                        new shapes.Point(x1,y1),
                                        r,
                                        String(ctx.strokeStyle),
                                        ctx.lineWidth,
                                        String(ctx.fillStyle));
        circle.draw(ctx);
        return circle;
    }

    static Ellipse(ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any) { 
        let r1 = Math.abs(x1 - x2);
        let r2 = Math.abs(y1 - y2);
        var ellipse = new shapes.Ellipse("Ellipse",
                                         new shapes.Point(x1,y1),
                                         r1,
                                         r2,
                                         String(ctx.strokeStyle),
                                         ctx.lineWidth,
                                         String(ctx.fillStyle));
        ellipse.draw(ctx);
        return ellipse;
    }

    static Star(ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any) {
        var outerRadius = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var star = new shapes.Star("Star",
                                   new shapes.Point(x1,y1),
                                   outerRadius,
                                   String(ctx.strokeStyle),
                                   ctx.lineWidth,
                                   String(ctx.fillStyle)); 
        star.draw(ctx);
        return star;
    }
    
    static Heart(ctx: CanvasRenderingContext2D, x1:any, y1:any, x2:any, y2:any) {
        var width = Math.abs(x1 - x2);
        var height = Math.abs(y1 - y2);
        var heart = new shapes.Heart("Heart",
                                     new shapes.Point(x1,y1),
                                     width,
                                     height,
                                     String(ctx.strokeStyle),
                                     ctx.lineWidth,
                                     String(ctx.fillStyle)); 
        heart.draw(ctx);
        return heart;
    }
    
}