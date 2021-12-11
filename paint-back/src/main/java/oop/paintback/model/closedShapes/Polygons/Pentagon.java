package oop.paintback.model.closedShapes.Polygons;

import java.awt.*;
import java.io.IOException;

public class Pentagon extends Polygon {
    private static Pentagon instance;

    public Pentagon() { }
    public Pentagon(Point[] points, Point center, String outLineColor, String fillColor) throws IOException {
        if(points.length == 5) {
            this.points = points;
            this.center = center;
            this.outlineColor = outLineColor;
            this.fillColor = fillColor;
        } else {
            throw new IOException("The input Points array size is not compatible with type: Pentagon");
        }
    }

    @Override
    public void setPoints(Point[] points) throws IOException{
        if(points.length == 5) {
            this.points = points;
        } else {
            throw new IOException("The input Points array size is not compatible with type: Pentagon");
        }
    }
}