package oop.paintback.model.openShapes;

import oop.paintback.model.Shape;
import java.awt.*;

public class LineSegment extends Shape {
    protected Point point1;
    protected Point point2;

    public LineSegment() { }
    public LineSegment(Point point1, Point point2, String outlineColor) {
        this.point1 = point1;
        this.point2 = point2;
        this.outlineColor = outlineColor;
    }

    public Point getPoint1() { return point1; }
    public Point getPoint2() { return point2; }

    public void setPoint1(Point point1) { this.point1 = point1; }
    public void setPoint2(Point point2) { this.point2 = point2; }

}
