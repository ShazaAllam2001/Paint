package oop.paintback.model.closedShapes.Ellipse;

import oop.paintback.model.closedShapes.closedShape;
import java.awt.*;

public class Ellipse extends closedShape {
    protected double radiusX, radiusY;

    public Ellipse() { }
    public Ellipse(Point center, double radiusX, double radiusY, String outlineColor, String fillColor){
        this.center = center;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.outlineColor = outlineColor;
        this.fillColor = fillColor;
    }

    public double getRadiusX() {
        return radiusX;
    }
    public double getRadiusY() {
        return radiusY;
    }

    public void setRadiusX(double radiusX){
        this.radiusX = radiusX;
    }
    public void setRadiusY(double radiusY){
        this.radiusY = radiusY;
    }

}