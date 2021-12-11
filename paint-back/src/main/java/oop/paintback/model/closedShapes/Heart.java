package oop.paintback.model.closedShapes;

import oop.paintback.model.closedShapes.closedShape;
import java.awt.*;

public class Heart extends closedShape {
    private static Heart instance;

    public Heart() { }
    public Heart(Point center) { this.center = center; }
}