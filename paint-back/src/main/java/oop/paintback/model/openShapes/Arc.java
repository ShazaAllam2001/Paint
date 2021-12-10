package oop.paintback.model.openShapes;

import java.awt.*;

public class Arc {
    private Point startPoint;
    private Point endPoint;
    private double radius;

    public Arc() { }
    public Arc(Point startPoint, Point endPoint, double radius) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.radius = radius;
    }

    public Point getStartPoint() { return startPoint; }
    public Point getEndPoint() { return endPoint; }
    public double getRadius() { return radius; }

    public void settStartPoint(Point startPoint) { this.startPoint = startPoint; }
    public void setEndPoint(Point endPoint) { this.endPoint = endPoint; }
    public void setRadius(double radius) { this.radius = radius; }
}
