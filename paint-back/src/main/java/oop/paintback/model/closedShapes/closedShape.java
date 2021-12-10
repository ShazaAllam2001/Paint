package oop.paintback.model.closedShapes;

import oop.paintback.model.Shape;
import java.awt.*;

public abstract class closedShape extends Shape {
    protected Point center;
    protected String fillColor;

    public Point getCenter() {
        return center;
    }
    public String getFillColor() {
        return fillColor;
    }

    public void setCenter(Point center){
        this.center = center;
    }
    public void setFillColor(String color) {
        this.fillColor = color;
    }
}
