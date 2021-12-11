package oop.paintback.model.closedShapes.Polygons.Rhomboid;

import java.awt.*;
import java.io.IOException;

public class Trapezoid extends Rhomboid {
    private static Trapezoid instance;

    public Trapezoid(Point[] points, Point center, String outLineColor, String fillColor) throws IOException {
        super(points, center, outLineColor, fillColor);
    }
}
