package oop.paintback.model.closedShapes.Polygons;

import java.awt.*;
import java.io.IOException;

public class Heptagon extends Polygon {
    private static Heptagon instance;

    public Heptagon() { }
    public Heptagon(Point[] points, Point center, String outLineColor, String fillColor) throws IOException {
        if(points.length == 7) {
            this.points = points;
            this.center = center;
            this.outlineColor = outLineColor;
            this.fillColor = fillColor;
        } else {
            throw new IOException("The input Points array size is not compatible with type: Heptagon");
        }
    }

    @Override
    public void setPoints(Point[] points) throws IOException{
        if(points.length == 7) {
            this.points = points;
        } else {
            throw new IOException("The input Points array size is not compatible with type: Heptagon");
        }
    }
}