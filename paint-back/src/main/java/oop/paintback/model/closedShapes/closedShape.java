package oop.paintback.model.closedShapes;

import oop.paintback.model.Shape;
import java.awt.*;

public abstract class closedShape extends Shape {
    protected double centerX,centerY;
    protected String fillColor;
    public double getCenterX() {
        return centerX;
    }
    public double getCenterY() {
        return centerY;
    }
    public String getFillColor() {
        return fillColor;
    }

    public void setCenterX(double centerX){
        this.centerX=centerX;
    }
    public void setCenterY(double centerY){
        this.centerY=centerY;
    }
    public void setFillColor(String color) {
        this.fillColor = color;
    }
}
