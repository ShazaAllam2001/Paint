package oop.paintback.model.closedShapes.Polygons;

import oop.paintback.database.LoadingData;
import oop.paintback.database.RunningData;
import org.json.JSONObject;

import java.awt.*;
import java.io.IOException;

public class Hexagon extends Polygon {
    private static Heptagon instance;
    private double point1X, point1Y, point2X, point2Y, point3X, point3Y;
    private double point4X, point4Y, point5X, point5Y, point6X, point6Y;

    public Hexagon() {
    }

    public Hexagon(double point1X, double point1Y, double point2X, double point2Y, double point3X, double point3Y,
                    double point4X, double point4Y, double point5X, double point5Y, double point6X, double point6Y,
                    String color,String id) {
        this.point1X = point1X; this.point1Y = point1Y;
        this.point2X = point2X; this.point2Y = point2Y;
        this.point3X = point3X; this.point3Y = point3Y;
        this.point4X = point4X; this.point4Y = point4Y;
        this.point5X = point5X; this.point5Y = point5Y;
        this.point6X = point6X; this.point6Y = point6Y;
        this.lineColor = color;
        this.id = id;
    }

    public double getPoint1X() {
        return point1X;
    }
    public double getPoint1Y() {
        return point1Y;
    }
    public double getPoint2X() {
        return point2X;
    }
    public double getPoint2Y() {
        return point2Y;
    }
    public double getPoint3X() {
        return point3X;
    }
    public double getPoint3Y() {
        return point3Y;
    }
    public double getPoint4X() {
        return point4X;
    }
    public double getPoint4Y() {
        return point4Y;
    }
    public double getPoint5X() {
        return point5X;
    }
    public double getPoint5Y() {
        return point5Y;
    }
    public double getPoint6X() { return point6X; }
    public double getPoint6Y() {
        return point6Y;
    }

    public void setPoint1X(double point1X) {
        this.point1X = point1X;
    }
    public void setPoint1Y(double point1Y) {
        this.point1Y = point1Y;
    }
    public void setPoint2X(double point2X) {
        this.point2X = point2X;
    }
    public void setPoint2Y(double point2Y) {
        this.point2Y = point2Y;
    }
    public void setPoint3X(double point3X) {
        this.point3X = point3X;
    }
    public void setPoint3Y(double point3Y) {
        this.point3Y = point3Y;
    }
    public void setPoint4X(double point1X) {
        this.point4X = point1X;
    }
    public void setPoint4Y(double point1Y) {
        this.point4Y = point1Y;
    }
    public void setPoint5X(double point2X) {
        this.point5X = point2X;
    }
    public void setPoint5Y(double point2Y) {
        this.point5Y = point2Y;
    }
    public void setPoint6X(double point3X) {
        this.point6X = point3X;
    }
    public void setPoint6Y(double point3Y) {
        this.point6Y = point3Y;
    }

    public static Heptagon getInstance() {
        if (instance == null) {
            synchronized (Heptagon.class) {
                if (instance == null)
                    instance = new Heptagon();
            }
        }
        return instance;
    }

    private double tArea(double x1, double y1, double x2, double y2, double x3, double y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    }

    @Override
    public void copy(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        Hexagon t;
        t = (Hexagon) data.getHexagons().get(index).clone();
        double differenceX = pointX - selectedX;
        double differenceY = pointY - selectedY;
        t.point1X = t.point1X + differenceX;
        t.point1Y = t.point1Y + differenceY;
        t.point2X = t.point2X + differenceX;
        t.point2Y = t.point2Y + differenceY;
        t.point3X = t.point3X + differenceX;
        t.point3Y = t.point3Y + differenceY;
        t.point4X = t.point4X + differenceX;
        t.point4Y = t.point4Y + differenceY;
        t.point5X = t.point5X + differenceX;
        t.point5Y = t.point5Y + differenceY;
        t.point6X = t.point6X + differenceX;
        t.point6Y = t.point6Y + differenceY;
        t.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
        data.getHexagons().add(t);
    }

    @Override
    public void move(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        Hexagon t = data.getHexagons().get(index);
        double differenceX = pointX - selectedX;
        double differenceY = pointY - selectedY;
        t.point1X = t.point1X + differenceX;
        t.point1Y = t.point1Y + differenceY;
        t.point2X = t.point2X + differenceX;
        t.point2Y = t.point2Y + differenceY;
        t.point3X = t.point3X + differenceX;
        t.point3Y = t.point3Y + differenceY;
        t.point4X = t.point4X + differenceX;
        t.point4Y = t.point4Y + differenceY;
        t.point5X = t.point5X + differenceX;
        t.point5Y = t.point5Y + differenceY;
        t.point6X = t.point6X + differenceX;
        t.point6Y = t.point6Y + differenceY;
        t.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void addNewShape(String jsonString, RunningData data) {
        JSONObject jsonObject = new JSONObject(jsonString);
        Hexagon hexagon = new Hexagon(jsonObject.getDouble("point1X"), jsonObject.getDouble("point1Y"),
                jsonObject.getDouble("point2X"), jsonObject.getDouble("point2Y"),
                jsonObject.getDouble("point3X"), jsonObject.getDouble("point3Y"),
                jsonObject.getDouble("point4X"), jsonObject.getDouble("point4Y"),
                jsonObject.getDouble("point5X"), jsonObject.getDouble("point5Y"),
                jsonObject.getDouble("point6X"), jsonObject.getDouble("point6Y"),
                jsonObject.getString("color"),jsonObject.getString("id"));
        data.getHexagons().add(hexagon);
    }

    @Override
    public void delete(int index, RunningData data) {
        data.getHexagons().remove(index);
    }

    @Override
    public void resize(int index, RunningData data, double scalar) {
        Hexagon t = data.getHexagons().get(index);
        double differenceX = (t.point1X + t.point2X + t.point3X + t.point4X + t.point5X + t.point6X) * (1-Math.sqrt(scalar)) / 3;
        double differenceY = (t.point1Y + t.point2Y + t.point3Y + t.point4Y + t.point5Y + t.point6Y) * (1-Math.sqrt(scalar)) / 3;
        t.point1X *= Math.sqrt(scalar)+differenceX;
        t.point1Y *= Math.sqrt(scalar)+differenceY;
        t.point2X *=  Math.sqrt(scalar)+differenceX;
        t.point2Y *= Math.sqrt(scalar)+differenceY;
        t.point3X *= Math.sqrt(scalar)+differenceX;
        t.point3Y *= Math.sqrt(scalar)+differenceY;
        t.point4X *= Math.sqrt(scalar)+differenceX;
        t.point4Y *= Math.sqrt(scalar)+differenceY;
        t.point5X *=  Math.sqrt(scalar)+differenceX;
        t.point5Y *= Math.sqrt(scalar)+differenceY;
        t.point6X *= Math.sqrt(scalar)+differenceX;
        t.point6Y *= Math.sqrt(scalar)+differenceY;
        t.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void print(RunningData data) {
        for (int i = 0; i < data.getTriangles().size(); i++) {
            System.out.print(data.getHeptagons().get(i).getPoint1X() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint1Y() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint2X() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint2Y() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint3X() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint3Y() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint4X() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint4Y() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint5X() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint5Y() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint6X() + "\t");
            System.out.print(data.getHeptagons().get(i).getPoint6Y() + "\n");
        }
    }

    @Override
    public boolean CheckIn(double pointx, double pointy, Object shape) {
        Hexagon tr = (Hexagon) shape;
        return (tArea(pointx, pointy, tr.point2X, tr.point2Y, tr.point3X, tr.point3Y)
                + tArea(pointx, pointy, tr.point1X, tr.point1Y, tr.point3X, tr.point3Y)
                + tArea(pointx, pointy, tr.point2X, tr.point2Y, tr.point1X, tr.point1Y)) == (tArea(tr.point1X,
                tr.point1Y, tr.point2X, tr.point2Y, tr.point3X, tr.point3Y));
    }

    @SuppressWarnings("unchecked")
    @Override
    public org.json.simple.JSONObject dataToString(LoadingData data, int index) {
        org.json.simple.JSONObject jsonObject=new org.json.simple.JSONObject();
        jsonObject.put("name","Triangle");
        jsonObject.put("point1X",data.getTriangles().get(index).getPoint1X());
        jsonObject.put("point1Y",data.getTriangles().get(index).getPoint1Y());
        jsonObject.put("point2X",data.getTriangles().get(index).getPoint2X());
        jsonObject.put("point2Y",data.getTriangles().get(index).getPoint2Y());
        jsonObject.put("point3X",data.getTriangles().get(index).getPoint3X());
        jsonObject.put("point3Y",data.getTriangles().get(index).getPoint3Y());
        jsonObject.put("color",data.getTriangles().get(index).getOutlineColor());
        jsonObject.put("id", data.getTriangles().get(index).getId());
        return jsonObject;
    }
}