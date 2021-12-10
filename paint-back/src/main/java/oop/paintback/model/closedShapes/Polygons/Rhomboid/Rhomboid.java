package oop.paintback.model.closedShapes.Polygons.Rhomboid;

import oop.paintback.model.closedShapes.Polygons.Polygon;

import java.awt.*;
import java.io.IOException;

public class Rhomboid extends Polygon {

    public Rhomboid() { }
    public Rhomboid(Point[] points, Point center, String outLineColor, String fillColor) throws IOException {
        if(points.length == 4) {
            this.points = points;
            this.center = center;
            this.outlineColor = outLineColor;
            this.fillColor = fillColor;
        } else {
            throw new IOException("The input Points array size is not compatible with type: Rhomboid");
        }
    }

    @Override
    public void setPoints(Point[] points) throws IOException{
        if(points.length == 4) {
            this.points = points;
        } else {
            throw new IOException("The input Points array size is not compatible with type: Rhomboid");
        }
    }

}