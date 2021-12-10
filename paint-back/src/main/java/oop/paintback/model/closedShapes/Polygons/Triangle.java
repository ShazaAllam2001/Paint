package oop.paintback.model.closedShapes.Polygons;

import java.awt.*;
import java.io.IOException;

public class Triangle extends Polygon {

    public Triangle() { }
    public Triangle(Point[] points, Point center, String outLineColor, String fillColor) throws IOException {
        if(points.length == 3) {
            this.points = points;
            this.center = center;
            this.outlineColor = outLineColor;
            this.fillColor = fillColor;
        } else {
         throw new IOException("The input Points array size is not compatible with type: Triangle");
        }
    }

    public void setPoints(Point[] points) throws IOException{
        if(points.length == 3) {
            this.points = points;
        } else {
            throw new IOException("The input Points array size is not compatible with type: Triangle");
        }
    }

}