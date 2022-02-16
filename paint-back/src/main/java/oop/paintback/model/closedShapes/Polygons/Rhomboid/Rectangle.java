package oop.paintback.model.closedShapes.Polygons.Rhomboid;

import java.awt.*;
import java.io.IOException;

public class Rectangle extends Rhomboid {
    private static Rectangle instance;

    public Rectangle(Point[] points, Point center, String outLineColor, String fillColor) throws IOException {
        super(points, center, outLineColor, fillColor);
    }

    @Override
    public void copy(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        Rectangle r = new Rectangle();
        r = (Rectangle) data.getRectangles().get(index).clone();
        double differenceX = pointX-selectedX;
        double differenceY = pointY-selectedY;
        r.setStartPointX(r.getStartPointX()+differenceX);
        r.setStartPointY(r.getStartPointY()+differenceY);
        r.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
        data.getRectangles().add(r);
    }

    @Override
    public void move(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        Rectangle r = data.getRectangles().get(index);
        double differenceX = pointX-selectedX;
        double differenceY = pointY-selectedY;
        r.setStartPointX(r.getStartPointX()+differenceX);
        r.setStartPointY(r.getStartPointY()+differenceY);
        r.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
        /*data.rectangles.add(index,r);
        data.rectangles.remove(index+1);*/
    }

    @Override
    public void addNewShape(String jsonString, RunningData data) {
        JSONObject jsonObject=new JSONObject(jsonString);
        Rectangle rectangle=new Rectangle(jsonObject.getDouble("startPointX"),jsonObject.getDouble("startPointY"),jsonObject.getDouble("width"),jsonObject.getDouble("height"),jsonObject.getString("color"),jsonObject.getString("id"));
        data.getRectangles().add(rectangle);
    }


    @Override
    public void delete(int index, RunningData data) {
        data.getRectangles().remove(index);
    }

    @Override
    public void resize(int index, RunningData data, double scalar) {
        Rectangle r = new Rectangle();
        r = (Rectangle) data.getRectangles().get(index).clone();
        double differenceX = r.width *(scalar/2);
        double differenceY = r.height *(scalar/2);
        double oldw = r.getWidth();
        double oldh = r.getHeight();
        r.setWidth(r.getWidth() * scalar);
        r.setHeight(r.getHeight() *scalar);
        if(scalar>1) {
            r.setStartPointX(r.getStartPointX()-differenceX+(oldw/2));
            r.setStartPointY(r.getStartPointY()+differenceY-(oldh/2));
        }else if (scalar<1) {
            r.setStartPointX(r.getStartPointX()+differenceX-(oldw/2));
            r.setStartPointY(r.getStartPointY()-differenceY+(oldh/2));
        }
        r.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
        data.getRectangles().add(index,r);
        data.getRectangles().remove(index+1);
    }

    @Override
    public void print(RunningData data) {
        for(int i=0;i<data.getRectangles().size();i++){
            System.out.print(data.getRectangles().get(i).getStartPointX()+"\t");
            System.out.print(data.getRectangles().get(i).getStartPointY()+"\t");
            System.out.print(data.getRectangles().get(i).getWidth()+"\t");
            System.out.print(data.getRectangles().get(i).getHeight()+"\n");
        }
    }

    public static Rectangle getInstance(){
        if(instance==null){
            synchronized (Rectangle.class){
                if(instance==null) instance=new Rectangle();
            }
        }
        return instance;
    }

    @Override
    public boolean CheckIn(double pointx, double pointy, Object shape) {
        Rectangle rect = (Rectangle)shape;
        double startX = rect.getStartPointX()-1.5;
        double startY = rect.getStartPointY()-1.5;
        double endX = rect.getStartPointX()+rect.width+1.5;
        double endY = rect.getStartPointY()+rect.height+1.5;
        return pointx > startX && pointx < endX && pointy > startY && pointy < endY;
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
        jsonObject.put("name","Rectangle");
        jsonObject.put("startPointX",data.getRectangles().get(index).getStartPointX());
        jsonObject.put("startPointY",data.getRectangles().get(index).getStartPointY());
        jsonObject.put("width",data.getRectangles().get(index).getWidth());
        jsonObject.put("height",data.getRectangles().get(index).getHeight());
        jsonObject.put("color",data.getRectangles().get(index).getColor());
        jsonObject.put("id", data.getRectangles().get(index).getId());
        return jsonObject;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

}