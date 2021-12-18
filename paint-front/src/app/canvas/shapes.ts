export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export class Shape {
    name: string = '';
    path: Path2D | null = null;
    lineColor: string = '';
    lineWidth: number = 1.5;
    constructor(name: string) {
        this.name = name;
    }
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
    bottomLeft: Point;
    maxWidth: number;
    constructor(name: string, text: string, bottomLeft: Point, maxWidth: number, font: string, lineColor: string, lineWidth: number) {
        super(name);
        this.text = text;
        this.bottomLeft = bottomLeft;
        this.maxWidth = maxWidth;
        this.font = font;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let font = ctx.font;
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        // change context styling to shape styling
        ctx.font = this.font;
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        // create path and save it for being used later
        let path = new Path2D();
        const h = parseInt(this.font.split("px")[0]);
        path.rect(this.bottomLeft.x, this.bottomLeft.y - h, this.maxWidth, h);
        this.path = path;
        // Draw the shape
        ctx.strokeText(this.text, this.bottomLeft.x, this.bottomLeft.y, this.maxWidth);
        ctx.fillText(this.text, this.bottomLeft.x, this.bottomLeft.y, this.maxWidth);
        // change it back to the previous state 
        ctx.font = font;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
    }
}
export class LineSegment extends Shape {
    point1: Point;
    point2: Point;
    constructor(name: string, point1: Point, point2: Point, lineColor: string, lineWidth: number) {
        super(name);
        this.point1 = point1;
        this.point2 = point2;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        // change context styling to shape styling
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        // create path and save it for being used later
        let path = new Path2D();
        path.moveTo(this.point1.x, this.point1.y);
        path.lineTo(this.point2.x, this.point2.y);
        path.closePath();
        this.path = path;
        ctx.stroke(path);
        ctx.beginPath();
        // change it back to the previous state 
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
    }
}
export class Triangle extends Polygon {
    constructor(name: string, points: Point[], lineColor: string, lineWidth: number, fillColor: string) {
        super(name);
        this.points = points;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        let fillColor = ctx.fillStyle;
        // change context styling to shape styling
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillColor;
        // create path and save it for being used later
        let path = new Path2D();
        if(this.points) {
            path.moveTo(this.points[0].x, this.points[0].y);
            path.lineTo(this.points[1].x, this.points[1].y);
            path.lineTo(this.points[2].x, this.points[2].y);
            path.closePath();
            this.path = path;
            ctx.stroke(path);
            ctx.fill(path);
            ctx.beginPath();
        }
        // change it back to the previous state 
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = fillColor;
    }
}
export class Polygonal extends Polygon {
    constructor(name:string, points: Point[], lineColor: string, lineWidth: number, fillColor: string) {
        super(name);
        this.points = points;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        let fillColor = ctx.fillStyle;
        // change context styling to shape styling
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillColor;
        // create path and save it for being used later
        let path = new Path2D();
        if(this.points) {
            for(let i=0 ; i<this.points.length; i++){
                path.lineTo(this.points[i].x, this.points[i].y);
            }
        }
        path.closePath();
        this.path = path;
        ctx.stroke(path);
        ctx.fill(path);
        ctx.beginPath();
        // change it back to the previous state 
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = fillColor;
    }
}
export class Rhomboid extends Polygon {
    constructor(name: string, points: Point[], lineColor: string, lineWidth: number, fillColor: string) {
        super(name);
        this.points = points;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        let fillColor = ctx.fillStyle;
        // change context styling to shape styling
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillColor;
        // create path and save it for being used later
        let path = new Path2D();
        if(this.points) {
            path.moveTo(this.points[0].x, this.points[0].y);
            path.lineTo(this.points[1].x, this.points[1].y);
            path.lineTo(this.points[2].x, this.points[2].y);
            path.lineTo(this.points[3].x, this.points[3].y);
            path.lineTo(this.points[0].x, this.points[0].y);
            path.closePath();
            this.path = path;
            ctx.stroke(path);
            ctx.fill(path);
            ctx.beginPath();
        }
        // change it back to the previous state 
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = fillColor;
    }
}
export class Rectangle extends Rhomboid {
    constructor(name:string, points: Point[], outlineColor: string, lineWidth: number, fillColor: string) {
        super(name, points, outlineColor, lineWidth, fillColor);
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        let fillColor = ctx.fillStyle;
        // change context styling to shape styling
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillColor;
        // create path and save it for being used later
        let path = new Path2D();
        ctx.closePath();
        if(this.points) {
            let width = Math.abs(this.points[0].x - this.points[1].x);
            let height = Math.abs(this.points[0].y - this.points[1].y);
            path.rect(this.points[0].x, this.points[0].y, width, height);
            this.path = path;
            ctx.stroke(path);
            ctx.fill(path);
        }
        ctx.beginPath();  
        // change it back to the previous state 
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = fillColor;
    }
}
export class Trapezoid extends Rhomboid {
    constructor(name:string, points: Point[], outlineColor: string, lineWidth: number, fillColor: string) {
        super(name, points, outlineColor, lineWidth, fillColor);
    }
}
export class Ellipse extends ClosedShape {
    radiusX: number;
    radiusY: number;
    constructor(name: string, center: Point, radiusX: number, radiusY: number, lineColor: string, lineWidth: number, fillColor: string) {
        super(name);
        this.center = center;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        let fillColor = ctx.fillStyle;
        // change context styling to shape styling
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillColor;
        // create path and save it for being used later
        let path = new Path2D();
        if(this.center) {
            path.ellipse(this.center.x, this.center.y, this.radiusX, this.radiusY, Math.PI, 0, 2 * Math.PI);
            path.closePath();
            this.path = path;
            ctx.stroke(path);
            ctx.fill(path);
            ctx.beginPath();
        } 
        // change it back to the previous state 
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = fillColor; 
    }
}
export class Circle extends ClosedShape {
    radius: number;
    constructor(name: string, center: Point, radius: number, lineColor: string, lineWidth: number, fillColor: string) {
        super(name);
        this.center = center;
        this.radius = radius;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        let fillColor = ctx.fillStyle;
        // change context styling to shape styling
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillColor;
        // create path and save it for being used later
        let path = new Path2D();
        if(this.center) {
            path.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            path.closePath();
            this.path = path;
            ctx.stroke(path);
            ctx.fill(path);
            ctx.beginPath();
        }  
        // change it back to the previous state 
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = fillColor; 
    }
}
export class Star extends ClosedShape {
    outerRadius: number;
    constructor(name: string, center: Point, outerRadius: number, lineColor: string, lineWidth: number, fillColor: string) {
        super(name);
        this.center = center;
        this.outerRadius = outerRadius;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        let fillColor = ctx.fillStyle;
        // change context styling to shape styling
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillColor;
        // create path and save it for being used later
        let path = new Path2D();
        if(this.center) {
            var rot = Math.PI/2*3;
            let innerRadius = this.outerRadius*(2/3);
            var x = this.center.x; var y = this.center.y;
            var step = Math.PI/5;
            path.moveTo(this.center.x, this.center.y-this.outerRadius);
            for(var i=0; i<5; i++){
                x = this.center.x + Math.cos(rot)*this.outerRadius;
                y = this.center.y + Math.sin(rot)*this.outerRadius;
                path.lineTo(x,y);
                rot += step;
                
                x = this.center.x + Math.cos(rot)*innerRadius;
                y = this.center.y + Math.sin(rot)*innerRadius;
                path.lineTo(x,y);
                rot += step;
            }
            path.lineTo(this.center.x, this.center.y-this.outerRadius);
            path.closePath();
            this.path = path;
            ctx.stroke(path);
            ctx.fill(path);
            ctx.beginPath();
        }
        // change it back to the previous state 
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = fillColor; 
    }
}
export class Heart extends ClosedShape {
    width: number;
    height: number;
    constructor(name: string, center: Point, width: number, height: number, lineColor: string, lineWidth: number, fillColor: string) {
        super(name);
        this.center = center;
        this.width = width;
        this.height = height;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    override draw(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'source-over';
        // save context current styling
        let lineColor = ctx.strokeStyle;
        let lineWidth = ctx.lineWidth;
        let fillColor = ctx.fillStyle;
        // change context styling to shape styling
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillColor;
        // create path and save it for being used later
        let path = new Path2D();
        if(this.center) {
            var x = this.center.x;
            var y = this.center.y;
            var topCurveHeight = this.height * 0.3;
            path.moveTo(x, y + topCurveHeight);
            // top left curve
            path.bezierCurveTo(
              x, y, 
              x - this.width / 2, y, 
              x - this.width / 2, y + topCurveHeight
            );
             
            // bottom left curve
            path.bezierCurveTo(
              x - this.width / 2, y + (this.height + topCurveHeight) / 2, 
              x, y + (this.height + topCurveHeight) / 2, 
              x, y + this.height
            );
  
            // bottom right curve
            path.bezierCurveTo(
              x, y + (this.height + topCurveHeight) / 2, 
              x + this.width / 2, y + (this.height + topCurveHeight) / 2, 
              x + this.width / 2, y + topCurveHeight
            );
    
            // top right curve
            path.bezierCurveTo(
              x + this.width / 2, y, 
              x, y, 
              x, y + topCurveHeight
            );

            path.closePath();
            ctx.stroke(path);
            this.path = path;
            ctx.fill(path);
            ctx.beginPath();
        }
        // change it back to the previous state 
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = fillColor; 
    }
}