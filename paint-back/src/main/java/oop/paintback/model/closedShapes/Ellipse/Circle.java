package oop.paintback.model.closedShapes.Ellipse;

import java.awt.*;

public class Circle extends Ellipse {

    public Circle() { }
    public Circle(Point center, double radius, String outlineColor, String fillColor) {
        super(center, radius, radius, outlineColor, fillColor);
    }

    @Override
    public void setRadiusX(double radius) {
        super.setRadiusX(radius);
        super.setRadiusY(radius);
    }
    @Override
    public void setRadiusY(double radius) {
        super.setRadiusX(radius);
        super.setRadiusY(radius);
    }
}