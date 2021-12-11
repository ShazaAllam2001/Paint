package oop.paintback.model.closedShapes;

import oop.paintback.model.closedShapes.closedShape;
import java.awt.*;

public class Star extends closedShape {
    private static Star instance;

    public Star() { }
    public Star(Point center) { this.center = center; }
}