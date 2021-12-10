package oop.paintback.model.closedShapes.Polygons;

import oop.paintback.model.closedShapes.closedShape;
import java.awt.*;
import java.io.IOException;

public abstract class Polygon extends closedShape {
    protected Point[] points;

    public Point[] getPoints() { return this.points; }

    public abstract void setPoints(Point[] points) throws IOException;
}