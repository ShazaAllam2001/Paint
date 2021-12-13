export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export class Shape {
    lineColor: string = '';
    lineWidth: number = 1.5;
    draw(ctx: CanvasRenderingContext2D) {}
}
export class ClosedShape extends Shape {
    fillColor: string = '';
    center: Point | null = null;
}
export class Polygon extends ClosedShape {
    points: Point[] | null = null;
}

/* Shapes Available */
export class Text extends Shape {
    text: string;
    font: string;
    topRight: Point;
    maxWidth: number;
    constructor(text: string, font: string, topRight: Point, maxWidth: number, lineColor: string, lineWidth: number) {
        super();
        this.text = text;
        this.font = font;
        this.topRight = topRight;
        this.maxWidth = maxWidth;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeText(this.text, this.topRight.x, this.topRight.y, this.maxWidth);
        ctx.fillText(this.text, this.topRight.x, this.topRight.y, this.maxWidth);
    }
}
export class LineSegment extends Shape {
    point1: Point;
    point2: Point;
    constructor(point1: Point, point2: Point, lineColor: string, lineWidth: number) {
        super();
        this.point1 = point1;
        this.point2 = point2;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
    }
}
export class Triangle extends Polygon {
    constructor(points: Point[], lineColor: string, lineWidth: number, fillColor: string) {
        super();
        this.points = points;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        if(this.points) {
            ctx.moveTo(this.points[0].x, this.points[0].y);
            ctx.lineTo(this.points[1].x, this.points[1].y);
            ctx.lineTo(this.points[2].x, this.points[2].y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
        }
    }
}
export class Polygonal extends Polygon {
    constructor(points: Point[], lineColor: string, lineWidth: number, fillColor: string) {
        super();
        this.points = points;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        if(this.points) {
            for(let i=0 ; i<this.points.length; i++){
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
    }
}
export class Rhomboid extends Polygon {
    constructor(points: Point[], lineColor: string, lineWidth: number, fillColor: string) {
        super();
        this.points = points;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        if(this.points) {
            ctx.moveTo(this.points[0].x, this.points[0].y);
            ctx.lineTo(this.points[1].x, this.points[1].y);
            ctx.lineTo(this.points[2].x, this.points[2].y);
            ctx.lineTo(this.points[3].x, this.points[3].y);
            ctx.lineTo(this.points[0].x, this.points[0].y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
        }
    }
}
export class Rectangle extends Rhomboid {
    constructor(points: Point[], outlineColor: string, lineWidth: number, fillColor: string) {
        super(points, outlineColor, lineWidth, fillColor);
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.closePath();
        if(this.points) {
            let width = Math.abs(this.points[0].x - this.points[1].x);
            let height = Math.abs(this.points[0].y - this.points[1].y);
            ctx.strokeRect(this.points[0].x, this.points[0].y, width, height);
            ctx.fillRect(this.points[0].x, this.points[0].y, width, height);
        }
        ctx.beginPath();  
    }
}
export class Trapezoid extends Rhomboid {
    constructor(points: Point[], outlineColor: string, lineWidth: number, fillColor: string) {
        super(points, outlineColor, lineWidth, fillColor);
    }
}
export class Ellipse extends ClosedShape {
    radiusX: number;
    radiusY: number;
    constructor(center: Point, radiusX: number, radiusY: number, lineColor: string, lineWidth: number, fillColor: string) {
        super();
        this.center = center;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        if(this.center) {
            ctx.ellipse(this.center.x, this.center.y, this.radiusX, this.radiusY, Math.PI, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
        }  
    }
}
export class Circle extends ClosedShape {
    radius: number;
    constructor(center: Point, radius: number, lineColor: string, lineWidth: number, fillColor: string) {
        super();
        this.center = center;
        this.radius = radius;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        if(this.center) {
            ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
        }  
    }
}
export class Star extends ClosedShape {
    outerRadius: number;
    constructor(center: Point, outerRadius: number, lineColor: string, lineWidth: number, fillColor: string) {
        super();
        this.center = center;
        this.outerRadius = outerRadius;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        if(this.center) {
            var rot = Math.PI/2*3;
            let innerRadius = this.outerRadius*(2/3);
            var x = this.center.x; var y = this.center.y;
            var step = Math.PI/5;
            ctx.globalCompositeOperation = 'source-over';
            ctx.moveTo(this.center.x, this.center.y-this.outerRadius);
            for(var i=0; i<5; i++){
                x = this.center.x + Math.cos(rot)*this.outerRadius;
                y = this.center.y + Math.sin(rot)*this.outerRadius;
                ctx.lineTo(x,y);
                rot += step;
                
                x = this.center.x + Math.cos(rot)*innerRadius;
                y = this.center.y + Math.sin(rot)*innerRadius;
                ctx.lineTo(x,y);
                rot += step;
            }
            ctx.lineTo(this.center.x, this.center.y-this.outerRadius);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
        }
      
    }
}
export class Heart extends ClosedShape {
    width: number;
    height: number;
    constructor(center: Point, width: number, height: number, lineColor: string, lineWidth: number, fillColor: string) {
        super();
        this.center = center;
        this.width = width;
        this.height = height;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        if(this.center) {
            var x = this.center.x;
            var y = this.center.y;
            var topCurveHeight = this.height * 0.3;
            ctx.globalCompositeOperation = 'source-over';
            ctx.moveTo(x, y + topCurveHeight);
            // top left curve
            ctx.bezierCurveTo(
              x, y, 
              x - this.width / 2, y, 
              x - this.width / 2, y + topCurveHeight
            );
             
            // bottom left curve
            ctx.bezierCurveTo(
              x - this.width / 2, y + (this.height + topCurveHeight) / 2, 
              x, y + (this.height + topCurveHeight) / 2, 
              x, y + this.height
            );
  
            // bottom right curve
            ctx.bezierCurveTo(
              x, y + (this.height + topCurveHeight) / 2, 
              x + this.width / 2, y + (this.height + topCurveHeight) / 2, 
              x + this.width / 2, y + topCurveHeight
            );
    
            // top right curve
            ctx.bezierCurveTo(
              x + this.width / 2, y, 
              x, y, 
              x, y + topCurveHeight
            );

            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
        }
    }
}