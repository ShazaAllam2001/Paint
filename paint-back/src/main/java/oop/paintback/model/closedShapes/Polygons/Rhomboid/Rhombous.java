package oop.paintback.model.closedShapes.Polygons.Rhomboid;

import java.awt.*;
import java.io.IOException;

public class Rhombous extends Rhomboid{
    private static Rhombous instance;

    public Rhombous(Point[] points, Point center, String outLineColor, String fillColor) throws IOException {
        super(points, center, outLineColor, fillColor);
    }
}
