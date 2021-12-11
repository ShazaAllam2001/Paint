package oop.paintback.model.closedShapes.Polygons;

import oop.paintback.database.LoadingData;
import oop.paintback.database.RunningData;
import org.json.JSONObject;

import java.awt.*;
import java.io.IOException;

public class Triangle extends Polygon {
    private static Triangle instance;

    public Triangle() { }
    public Triangle(Point[] points, Point center, String outLineColor, String fillColor) throws IOException {
        if(points.length == 3) {
            this.points = points;
            this.center = center;
            this.outlineColor = outLineColor;
            this.fillColor = fillColor;
        } else {
         throw new IOException("The input Points array size is not compatible with type: Triangle");
        }
    }

    public void setPoints(Point[] points) throws IOException{
        if(points.length == 3) {
            this.points = points;
        } else {
            throw new IOException("The input Points array size is not compatible with type: Triangle");
        }
    }

    public static Triangle getInstance() {
        if (instance == null) {
            synchronized (Triangle.class) {
                if (instance == null)
                    instance = new Triangle();
            }
        }
        return instance;
    }

    private double tArea(double x1, double y1, double x2, double y2, double x3, double y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    }

    @Override
    public void copy(Point selected, Point point, int index, RunningData data) {
        Triangle t = new Triangle();
        t = (Triangle) data.getTriangles().get(index).clone();
        double differenceX = point.x - selected.x;
        double differenceY = point.y - selected.y;
        t.points[0].x = t.points[0].x + differenceX;
        t.points[0].y = t.points[0].y + differenceY;
        t.points[1].x = t.points[1].x + differenceX;
        t.points[1].y = t.points[1].y + differenceY;
        t.point3X = t.point3X + differenceX;
        t.point3Y = t.point3Y + differenceY;
        t.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
        data.getTriangles().add(t);
    }

    @Override
    public void move(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        Triangle t = data.getTriangles().get(index);
        double differenceX = pointX - selectedX;
        double differenceY = pointY - selectedY;
        t.point1X = t.point1X + differenceX;
        t.point1Y = t.point1Y + differenceY;
        t.point2X = t.point2X + differenceX;
        t.point2Y = t.point2Y + differenceY;
        t.point3X = t.point3X + differenceX;
        t.point3Y = t.point3Y + differenceY;
        t.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void addNewShape(String jsonString, RunningData data) {
        JSONObject jsonObject = new JSONObject(jsonString);
        Triangle triangle = new Triangle(jsonObject.getDouble("point1X"), jsonObject.getDouble("point1Y"),
                jsonObject.getDouble("point2X"), jsonObject.getDouble("point2Y"), jsonObject.getDouble("point3X"),
                jsonObject.getDouble("point3Y"),jsonObject.getString("color"),jsonObject.getString("id"));
        data.getTriangles().add(triangle);
    }

    @Override
    public void delete(int index, RunningData data) {
        data.getTriangles().remove(index);
    }

    @Override
    public void resize(int index, RunningData data, double scalar) {
        Triangle t = data.getTriangles().get(index);
        double differenceX = (t.point1X + t.point2X + t.point3X) * (1-Math.sqrt(scalar)) / 3;
        double differenceY = (t.point1Y + t.point2Y + t.point3Y) * (1-Math.sqrt(scalar)) / 3;
        t.point1X = t.point1X * Math.sqrt(scalar)+differenceX;
        t.point1Y = t.point1Y * Math.sqrt(scalar)+differenceY;
        t.point2X = t.point2X * Math.sqrt(scalar)+differenceX;
        t.point2Y = t.point2Y * Math.sqrt(scalar)+differenceY;
        t.point3X = t.point3X * Math.sqrt(scalar)+differenceX;
        t.point3Y = t.point3Y * Math.sqrt(scalar)+differenceY;
        t.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void print(RunningData data) {
        for (int i = 0; i < data.getTriangles().size(); i++) {
            System.out.print(data.getTriangles().get(i).getPoint1X() + "\t");
            System.out.print(data.getTriangles().get(i).getPoint1Y() + "\t");
            System.out.print(data.getTriangles().get(i).getPoint2X() + "\t");
            System.out.print(data.getTriangles().get(i).getPoint2Y() + "\t");
            System.out.print(data.getTriangles().get(i).getPoint2Y() + "\t");
            System.out.print(data.getTriangles().get(i).getPoint3X() + "\t");
            System.out.print(data.getTriangles().get(i).getPoint3Y() + "\n");
        }
    }

    @Override
    public boolean CheckIn(double pointx, double pointy, Object shape) {
        Triangle tr = (Triangle) shape;
        return (tArea(pointx, pointy, tr.point2X, tr.point2Y, tr.point3X, tr.point3Y)
                + tArea(pointx, pointy, tr.point1X, tr.point1Y, tr.point3X, tr.point3Y)
                + tArea(pointx, pointy, tr.point2X, tr.point2Y, tr.point1X, tr.point1Y)) == (tArea(tr.point1X,
                tr.point1Y, tr.point2X, tr.point2Y, tr.point3X, tr.point3Y));
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
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
        jsonObject.put("color",data.getTriangles().get(index).getColor());
        jsonObject.put("id", data.getTriangles().get(index).getId());
        return jsonObject;
    }

}