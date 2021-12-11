package oop.paintback.model.closedShapes.Ellipse;

import oop.paintback.database.LoadingData;
import oop.paintback.model.closedShapes.closedShape;
import java.awt.*;

public class Ellipse extends closedShape {
    private static Ellipse instance;
    protected double radiusX, radiusY;

    public Ellipse() { }
    public Ellipse(Point center, double radiusX, double radiusY, String outlineColor, String fillColor){
        this.center = center;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.outlineColor = outlineColor;
        this.fillColor = fillColor;
    }

    public double getRadiusX() {
        return radiusX;
    }
    public double getRadiusY() {
        return radiusY;
    }

    public void setRadiusX(double radiusX){
        this.radiusX = radiusX;
    }
    public void setRadiusY(double radiusY){
        this.radiusY = radiusY;
    }

    @Override
    public void copy(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        double differenceX=pointX-selectedX,differenceY=pointY-selectedY;
        Ellipse temp = new Ellipse();
        temp = (Ellipse) data.getEllipses().get(index).clone();
        temp.centerX+=differenceX;
        temp.centerY+=differenceY;
        temp.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
        data.getEllipses().add(temp);
    }

    @Override
    public void move(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        double differenceX=pointX-selectedX,differenceY=pointY-selectedY;
        Ellipse temp = data.getEllipses().get(index);
        temp.centerX+=differenceX;
        temp.centerY+=differenceY;
        temp.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void addNewShape(String jsonString, RunningData data) {
        JSONObject jsonObject=new JSONObject(jsonString);
        Ellipse ellipse=new Ellipse(jsonObject.getDouble("centerX"),jsonObject.getDouble("centerY"),jsonObject.getDouble("radiusX"),jsonObject.getDouble("radiusY"),jsonObject.getString("color"),jsonObject.getString("id"));
        data.getEllipses().add(ellipse);
    }


    @Override
    public void delete(int index, RunningData data) {
        data.getEllipses().remove(index);
    }

    @Override
    public void resize(int index, RunningData data, double scalar) {
        data.getEllipses().get(index).setRadiusX(data.getEllipses().get(index).getRadiusX()*scalar);
        data.getEllipses().get(index).setRadiusY(data.getEllipses().get(index).getRadiusY()*scalar);
        data.getEllipses().get(index).setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void print(RunningData data) {
        for(int i=0;i<data.getEllipses().size();i++){
            System.out.print(data.getEllipses().get(i).getCenterX()+"\t");
            System.out.print(data.getEllipses().get(i).getCenterY()+"\t");
            System.out.print(data.getEllipses().get(i).getRadiusX()+"\t");
            System.out.print(data.getEllipses().get(i).getRadiusY()+"\n");
        }
    }

    public static Ellipse getInstance(){
        if(instance==null){
            synchronized (Ellipse.class){
                if(instance==null) instance=new Ellipse();
            }
        }
        return instance;
    }

    @Override
    public boolean CheckIn(double pointx, double pointy, Object shape) {
        /*System.out.println(((Ellipse)shape).getCenterX());
        System.out.println(((Ellipse)shape).getCenterY());
        System.out.println(((Ellipse)shape).getRadiusX());
        System.out.println(((Ellipse)shape).getRadiusY());*/
        double checker = (Math.pow(pointx-((Ellipse) shape).getCenterX(), 2) / Math.pow(((Ellipse) shape).getRadiusX() + 1.5, 2))
                + (Math.pow(pointy-((Ellipse) shape).getCenterY(), 2) / Math.pow(((Ellipse) shape).getRadiusY() + 1.5, 2));
        return !(checker > 1);
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
        jsonObject.put("name","Ellipse");
        jsonObject.put("centerX",data.getEllipses().get(index).getCenterX());
        jsonObject.put("centerY",data.getEllipses().get(index).getCenterY());
        jsonObject.put("radiusX",data.getEllipses().get(index).getRadiusX());
        jsonObject.put("radiusY",data.getEllipses().get(index).getRadiusY());
        jsonObject.put("color",data.getEllipses().get(index).getColor());
        jsonObject.put("id",data.getEllipses().get(index).getId());
        return jsonObject;
    }

}