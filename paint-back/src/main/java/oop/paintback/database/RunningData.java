package oop.paintback.database;

import oop.paintback.model.LineSegment;
import oop.paintback.model.closedShapes.Ellipse.Circle;
import oop.paintback.model.closedShapes.Ellipse.Ellipse;
import oop.paintback.model.closedShapes.Heart;
import oop.paintback.model.closedShapes.Polygons.Heptagon;
import oop.paintback.model.closedShapes.Polygons.Hexagon;
import oop.paintback.model.closedShapes.Polygons.Pentagon;
import oop.paintback.model.closedShapes.Polygons.Rhomboid.Rectangle;
import oop.paintback.model.closedShapes.Polygons.Rhomboid.Rhomboid;
import oop.paintback.model.closedShapes.Polygons.Rhomboid.Rhombous;
import oop.paintback.model.closedShapes.Polygons.Rhomboid.Trapezoid;
import oop.paintback.model.closedShapes.Polygons.Triangle;
import oop.paintback.model.closedShapes.Star;

import java.util.ArrayList;
import java.util.Stack;

public class RunningData {
	private ArrayList<LineSegment> lines = new ArrayList<LineSegment>();
	private ArrayList<Triangle> triangles = new ArrayList<Triangle>();
	private ArrayList<Rhomboid> rhomboids = new ArrayList<Rhomboid>();
	private ArrayList<Rhombous> rhombous = new ArrayList<Rhombous>();
	private ArrayList<Trapezoid> trapezoids = new ArrayList<Trapezoid>();
	private ArrayList<Rectangle> rectangles = new ArrayList<Rectangle>();
	private ArrayList<Pentagon> pentagons = new ArrayList<Pentagon>();
	private ArrayList<Hexagon> hexagons = new ArrayList<Hexagon>();
	private ArrayList<Heptagon> heptagons = new ArrayList<Heptagon>();
	private ArrayList<Ellipse> ellipses = new ArrayList<Ellipse>();
	private ArrayList<Circle> circles = new ArrayList<Circle>();
	private ArrayList<Star> stars = new ArrayList<Star>();
	private ArrayList<Heart> hearts = new ArrayList<Heart>();

    private Stack<String> shapesStack = new Stack<String>();
    private Stack<LoadingData> undoStack = new Stack<LoadingData>();
    private Stack<LoadingData> redoStack = new Stack<LoadingData>();

    public RunningData () {}
    public RunningData (RunningData data) {
		this.setLines(data.getLines());
		this.setTriangles(data.getTriangles());
		this.setRhomboids(data.getRhomboids());
		this.setRhombous(data.getRhombous());
		this.setTrapezoids(data.getTrapezoids());
		this.setRectangles(data.getRectangles());
    	this.setPentagons(data.getPentagons());
		this.setHexagons(data.getHexagons());
        this.setCircles(data.getCircles());
        this.setEllipses(data.getEllipses());
        this.setStars(data.getStars());
        this.setHearts(data.getHearts());

        this.setShapesStack(data.getShapesStack());
        this.setUndoStack(data.getUndoStack());
        this.setRedoStack(data.getRedoStack());
    }
    
    public void renewData (LoadingData data){
		this.setLines(data.getLines());
		this.setTriangles(data.getTriangles());
		this.setRhomboids(data.getRhomboids());
		this.setRhombous(data.getRhombous());
		this.setTrapezoids(data.getTrapezoids());
		this.setRectangles(data.getRectangles());
		this.setPentagons(data.getPentagons());
		this.setHexagons(data.getHexagons());
		this.setCircles(data.getCircles());
		this.setEllipses(data.getEllipses());
		this.setStars(data.getStars());
		this.setHearts(data.getHearts());

		this.setShapesStack(data.getShapesStack());
    }
	public ArrayList<LineSegment> getLines() {
		return lines;
	}
	public void setLines(Object object) {
		this.lines = (ArrayList<LineSegment>) object;
	}

	public ArrayList<Triangle> getTriangles() {
		return triangles;
	}
	public void setTriangles(Object object) {
		this.triangles = (ArrayList<Triangle>) object;
	}

	public ArrayList<Rhomboid> getRhomboids() {
		return rhomboids;
	}
	public void setRhomboids(Object object) {
		this.rhomboids = (ArrayList<Rhomboid>) object;
	}

	public ArrayList<Rhombous> getRhombous() {
		return rhombous;
	}
	public void setRhombous(Object object) {
		this.rhombous = (ArrayList<Rhombous>) object;
	}

	public ArrayList<Trapezoid> getTrapezoids() {
		return trapezoids;
	}
	public void setTrapezoids(Object object) {
		this.trapezoids = (ArrayList<Trapezoid>) object;
	}

	public ArrayList<Rectangle> getRectangles() {
		return rectangles;
	}
	public void setRectangles(Object object) {
		this.rectangles = (ArrayList<Rectangle>) object;
	}

	public ArrayList<Pentagon> getPentagons() {
		return pentagons;
	}
	public void setPentagons(Object object) { this.pentagons = (ArrayList<Pentagon>) object; }

	public ArrayList<Hexagon> getHexagons() {
		return hexagons;
	}
	public void setHexagons(Object object) { this.hexagons = (ArrayList<Hexagon>) object; }

	public ArrayList<Heptagon> getHeptagons() {
		return heptagons;
	}
	public void setHeptagons(Object object) { this.heptagons = (ArrayList<Heptagon>) object; }
	public ArrayList<Circle> getCircles() {
		return circles;
	}
	public void setCircles(Object object) {
		this.circles = (ArrayList<Circle>) object;
	}

	public ArrayList<Ellipse> getEllipses() {
		return ellipses;
	}
	public void setEllipses(Object object) {
		this.ellipses = (ArrayList<Ellipse>) object;
	}

	public ArrayList<Star> getStars() {
		return stars;
	}
	public void setStars(Object object) {
		this.stars = (ArrayList<Star>) object;
	}

	public ArrayList<Heart> getHearts() {
		return hearts;
	}
	public void setHearts(Object object) { this.hearts = (ArrayList<Heart>) object; }

	public Stack<String> getShapesStack() {
		return shapesStack;
	}
	public void setShapesStack(Stack<String> shapesStack) {
		this.shapesStack = shapesStack;
	}
	public Stack<LoadingData> getUndoStack() {
		return undoStack;
	}
	public void setUndoStack(Stack<LoadingData> undoStack) {
		this.undoStack = undoStack;
	}
	public Stack<LoadingData> getRedoStack() {
		return redoStack;
	}
	public void setRedoStack(Stack<LoadingData> redoStack) {
		this.redoStack = redoStack;
	}
}
