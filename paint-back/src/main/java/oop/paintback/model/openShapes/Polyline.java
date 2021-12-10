package oop.paintback.model.openShapes;

import oop.paintback.model.Shape;
import java.util.ArrayList;

public class Polyline extends Shape {
    protected ArrayList<Arc> arcs;

    public Polyline(String outLineColor) {
        this.arcs = new ArrayList<>();
        this.outlineColor = outLineColor;
    }

    public void addArc(Arc arc) { this.arcs.add(arc); }
    public void removeArc(Arc arc) { this.arcs.remove(arc); }
}
