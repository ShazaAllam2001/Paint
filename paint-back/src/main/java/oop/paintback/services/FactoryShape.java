package oop.paintback.services;

import oop.paintback.model.*;
import oop.paintback.model.closedShapes.Ellipse.Circle;
import oop.paintback.model.closedShapes.Ellipse.Ellipse;
import oop.paintback.model.closedShapes.Heart;
import oop.paintback.model.closedShapes.Polygons.Heptagon;
import oop.paintback.model.closedShapes.Polygons.Hexagon;
import oop.paintback.model.closedShapes.Polygons.Rhomboid.Rectangle;
import oop.paintback.model.closedShapes.Polygons.Rhomboid.Rhomboid;
import oop.paintback.model.closedShapes.Polygons.Rhomboid.Rhombous;
import oop.paintback.model.closedShapes.Polygons.Rhomboid.Trapezoid;
import oop.paintback.model.closedShapes.Polygons.Triangle;
import oop.paintback.model.closedShapes.Star;

public class FactoryShape {
    public Shape getShape(String shapeName){
        if(shapeName==null) return null;
        if(shapeName.equalsIgnoreCase("LineSegment"))
            return LineSegment.getInstance();
        else if(shapeName.equalsIgnoreCase("Triangle"))
            return Triangle.getInstance();
        else if(shapeName.equalsIgnoreCase("Rhomboid"))
            return Rhomboid.getInstance();
        else if(shapeName.equalsIgnoreCase("Rhombous"))
            return Rhombous.getInstance();
        else if(shapeName.equalsIgnoreCase("Trapezoid"))
            return Trapezoid.getInstance();
        else if(shapeName.equalsIgnoreCase("Rectangle"))
            return Rectangle.getInstance();
        else if(shapeName.equalsIgnoreCase("Heptagon"))
            return Rectangle.getInstance();
        else if(shapeName.equalsIgnoreCase("Hexagon"))
            return Hexagon.getInstance();
        else if(shapeName.equalsIgnoreCase("Heptagon"))
            return Heptagon.getInstance();
        else if(shapeName.equalsIgnoreCase("Circle"))
            return Circle.getInstance();
        else if(shapeName.equalsIgnoreCase("Ellipse"))
            return Ellipse.getInstance();
        else if(shapeName.equalsIgnoreCase("Heart"))
            return Heart.getInstance();
        else if(shapeName.equalsIgnoreCase("Star"))
            return Star.getInstance();
        else return null;
    }
}
