package oop.paintback.model.closedShapes.Ellipse;

import oop.paintback.database.LoadingData;
import oop.paintback.database.RunningData;
import org.json.JSONObject;

import java.awt.*;

public class Circle extends Ellipse {
    private static Circle instance;

    public Circle() { }
    public Circle(Point center, double radius, String outlineColor, String fillColor) {
        super(center, radius, radius, outlineColor, fillColor);
    }

    @Override
    public void setRadiusX(double radius) {
        super.setRadiusX(radius);
        super.setRadiusY(radius);
    }
    @Override
    public void setRadiusY(double radius) {
        super.setRadiusX(radius);
        super.setRadiusY(radius);
    }

    @Override
    public void copy(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        double differenceX=pointX-selectedX,differenceY=pointY-selectedY;
        Circle temp = new Circle();
        temp = (Circle) data.getCircles().get(index).clone();
        temp.center.x+=differenceX;
        temp.center.y+=differenceY;
        temp.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
        data.getCircles().add(temp);
    }

    @Override
    public void move(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        double differenceX=pointX-selectedX,differenceY=pointY-selectedY;
        Circle temp = data.getCircles().get(index);
        temp.setCenter(temp.getCenter().x+differenceX, temp.getCenter().x+differenceY);
        temp.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void addNewShape(String jsonString, RunningData data) {
        JSONObject jsonObject = new JSONObject(jsonString);
        Circle circle=new Circle(jsonObject.getDouble("centerX"),jsonObject.getDouble("centerY"),jsonObject.getDouble("radius"),jsonObject.getString("color"),jsonObject.getString("id"));
        data.getCircles().add(circle);
    }

    @Override
    public void delete(int index, RunningData data) {
        data.getCircles().remove(index);
    }

    @Override
    public void resize(int index, RunningData data, double scalar) {
        data.getCircles().get(index).setRadius(data.getCircles().get(index).getRadius()*scalar);
        data.getCircles().get(index).setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void print(RunningData data) {
        for(int i=0;i<data.getCircles().size();i++){
            System.out.print(data.getCircles().get(i).getCenter().x+"\t");
            System.out.print(data.getCircles().get(i).getCenter().y+"\t");
            System.out.print(data.getCircles().get(i).getRadius()+"\n");
        }
    }

    public static Circle getInstance(){
        if(instance==null){
            synchronized (Circle.class){
                if(instance==null) instance=new Circle();
            }
        }
        return instance;
    }

    @Override
    public boolean CheckIn(double pointx, double pointy, Object shape) {
        return !(Math.sqrt(Math.pow(pointx - ((Circle) shape).getCenterX(), 2)
                + Math.pow(pointy - ((Circle) shape).getCenterY(), 2)) > (((Circle) shape).getRadius() + 1.5));
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
        jsonObject.put("name","Circle");
        jsonObject.put("centerX",data.getCircles().get(index).getCenterX());
        jsonObject.put("centerY",data.getCircles().get(index).getCenterY());
        jsonObject.put("radius",data.getCircles().get(index).getRadius());
        jsonObject.put("color",data.getCircles().get(index).getColor());
        jsonObject.put("id",data.getCircles().get(index).getId());
        return jsonObject;
    }
}