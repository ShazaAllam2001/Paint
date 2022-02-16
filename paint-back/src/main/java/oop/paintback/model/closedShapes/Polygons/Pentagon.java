package oop.paintback.model.closedShapes.Polygons;

import oop.paintback.model.closedShapes.Heart;

import java.awt.*;
import java.io.IOException;

public class Pentagon extends Polygon {
    private static Pentagon instance;

    public Pentagon() { }

    public static Pentagon getInstance(){
        if(instance==null){
            synchronized (Pentagon.class){
                if(instance==null) instance=new Pentagon();
            }
        }
        return instance;
    }
}