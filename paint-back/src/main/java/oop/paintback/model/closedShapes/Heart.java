package oop.paintback.model.closedShapes;

import oop.paintback.database.LoadingData;
import oop.paintback.database.RunningData;
import oop.paintback.model.closedShapes.closedShape;
import org.json.JSONObject;

import java.awt.*;

public class Heart extends closedShape {
    private static Heart instance;
    private double radius;

    public Heart() { }
    public Heart(double centerX,double centerY,double radius,String color,String id){
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.lineColor=color;
        this.id = id;
    }

    @Override
    public void copy(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
         double differenceX=pointX-selectedX,differenceY=pointY-selectedY;
        Heart temp;
        temp = (Heart) data.getCircles().get(index).clone();
        temp.centerX+=differenceX;
        temp.centerY+=differenceY;
        temp.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
        data.getHearts().add(temp);
    }

    @Override
    public void move(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data) {
        double differenceX=pointX-selectedX,differenceY=pointY-selectedY;
        Heart temp = data.getHearts().get(index);
        temp.setCenterX(temp.getCenterX()+differenceX);
        temp.setCenterY(temp.getCenterY()+differenceY);
        temp.setId(Integer.parseInt(data.getShapesStack().peek())+1+"");
    }

    @Override
    public void addNewShape(String jsonString, RunningData data) {
        JSONObject jsonObject=new JSONObject(jsonString);
        Heart heart=new Heart(jsonObject.getDouble("centerX"),jsonObject.getDouble("centerY"),jsonObject.getDouble("radius"),jsonObject.getString("color"),jsonObject.getString("id"));
        data.getHearts().add(heart);
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
            System.out.print(data.getCircles().get(i).getCenterX()+"\t");
            System.out.print(data.getCircles().get(i).getCenterY()+"\t");
            System.out.print(data.getCircles().get(i).getRadius()+"\n");
        }
    }

    public static Heart getInstance(){
        if(instance==null){
            synchronized (Heart.class){
                if(instance==null) instance=new Heart();
            }
        }
        return instance;
    }

    @Override
    public boolean CheckIn(double pointx, double pointy, Object shape) {
        return !(Math.sqrt(Math.pow(pointx - ((Heart) shape).getCenterX(), 2)
                + Math.pow(pointy - ((Heart) shape).getCenterY(), 2)) > (((Heart) shape).getRadius() + 1.5));
    }

    @SuppressWarnings("unchecked")
    @Override
    public org.json.simple.JSONObject dataToString(LoadingData data, int index) {
        org.json.simple.JSONObject jsonObject=new org.json.simple.JSONObject();
        jsonObject.put("name","Circle");
        jsonObject.put("centerX",data.getCircles().get(index).getCenterX());
        jsonObject.put("centerY",data.getCircles().get(index).getCenterY());
        jsonObject.put("radius",data.getCircles().get(index).getRadius());
        jsonObject.put("color",data.getCircles().get(index).getOutlineColor());
        jsonObject.put("id",data.getCircles().get(index).getId());
        return jsonObject;
    }
}