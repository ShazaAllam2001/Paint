package oop.paintback.model;

import oop.paintback.database.LoadingData;
import oop.paintback.database.RunningData;
import org.json.JSONArray;
import org.json.JSONObject;
import java.awt.*;

public class LineSegment extends Shape {
    private static LineSegment instance;
    protected Point point1;
    protected Point point2;

    public LineSegment() { }
    public LineSegment(Point point1, Point point2, String outlineColor, String id) {
        this.point1 = point1;
        this.point2 = point2;
        this.outlineColor = outlineColor;
        this.id = id;
    }

    public Point getPoint1() { return point1; }
    public Point getPoint2() { return point2; }

    public void setPoint1(Point point1) { this.point1 = point1; }
    public void setPoint2(Point point2) { this.point2 = point2; }

    @Override
    public void copy(Point selected, Point point, int index, RunningData data) {
        double differenceX = point.x - selected.x, differenceY = point.y - selected.y;
        LineSegment temp;
        temp = (LineSegment) data.getLines().get(index).clone();
        temp.startPoint.x += differenceX;
        temp.startPoint.x += differenceY;
        temp.endPoint.x += differenceX;
        temp.endPoint.y += differenceY;
        temp.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
        data.getLines().add(temp);
    }

    @Override
    public void move(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        double differenceX = pointX - selectedX, differenceY = pointY - selectedY;
        LineSegment temp = data.getLines().get(index);
        temp.startPointX += differenceX;
        temp.startPointY += differenceY;
        temp.endPointX += differenceX;
        temp.endPointY += differenceY;
        temp.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void addNewShape(String jsonString, RunningData data) {
        JSONObject jsonObject = new JSONObject(jsonString);
        LineSegment line = new LineSegment(jsonObject.getDouble("startPointX"), jsonObject.getDouble("startPointY"),
                jsonObject.getDouble("endPointX"), jsonObject.getDouble("endPointY"), jsonObject.getString("color"),
                jsonObject.getString("id"));
        data.getLines().add(line);
    }

    @Override
    public void delete(int index, RunningData data) {
        data.getLines().remove(index);
    }

    @Override
    public void resize(int index, RunningData data, double scalar) {
        LineSegment temp = data.getLines().get(index);
        double differenceX = (temp.startPointX + temp.endPointX) * (1 - Math.sqrt(scalar)) / 2;
        double differenceY = (temp.startPointY + temp.endPointY) * (1 - Math.sqrt(scalar)) / 2;
        temp.startPointX *= Math.sqrt(scalar) + differenceX;
        temp.startPointY *= Math.sqrt(scalar) + differenceY;
        temp.endPointX *= Math.sqrt(scalar) + differenceX;
        temp.endPointY *= Math.sqrt(scalar) + differenceY;
        temp.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void print(RunningData data) {
        for (int i = 0; i < data.getLines().size(); i++) {
            System.out.print(data.getLines().get(i).getStartPointX() + "\t");
            System.out.print(data.getLines().get(i).getStartPointY() + "\t");
            System.out.print(data.getLines().get(i).getEndPointX() + "\t");
            System.out.print(data.getLines().get(i).getEndPointY() + "\n");
        }
    }

    @Override
    public boolean CheckIn(double pointx, double pointy, Object shape) {
        LineSegment l = (LineSegment) shape;
        double linelength = Math
                .sqrt(Math.pow(l.startPointX - l.endPointX, 2) + Math.pow(l.startPointY - l.endPointY, 2));
        double triangleArea = tArea(pointx, pointy, l.startPointX, l.startPointY, l.endPointX, l.endPointY);
        double height = triangleArea / (0.5 * linelength);
        return !(height > 1.5);
    }

    private double tArea(double x1, double y1, double x2, double y2, double x3, double y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    }

    @SuppressWarnings("unchecked")
    @Override
    public org.json.JSONObject dataToString(LoadingData data, int index) {
        org.json.simple.JSONObject jsonObject = new org.json.JSONObject();
        jsonObject.put("name", "LineSegment");
        jsonObject.put("startPointX", data.getLines().get(index).getStartPointX());
        jsonObject.put("startPointY", data.getLines().get(index).getStartPointY());
        jsonObject.put("endPointX", data.getLines().get(index).getEndPointX());
        jsonObject.put("endPointY", data.getLines().get(index).getEndPointY());
        jsonObject.put("color", data.getLines().get(index).getColor());
        jsonObject.put("id", data.getLines().get(index).getId());
        return jsonObject;
    }



}
