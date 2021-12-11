package oop.paintback.services;
import oop.paintback.database.RunningData;
import oop.paintback.database.Selector;
import oop.paintback.database.LoadingData;
import oop.paintback.model.*;
import oop.paintback.model.closedShapes.Ellipse.Circle;
import oop.paintback.model.closedShapes.Ellipse.Ellipse;
import oop.paintback.model.closedShapes.Polygons.Rhomboid.Rectangle;
import oop.paintback.model.closedShapes.Polygons.Triangle;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Stack;

public class MainMethodsServices {
    RunningData data = new RunningData();
    HelpMethods help = new HelpMethods();
    FactoryShape factory = new FactoryShape();
    Shape shape;
    public void handle(String name, String id, String jsonString) {
        shape = factory.getShape(name);
        data.getShapesStack().add(id);
        shape.addNewShape(jsonString,data);
        data.getUndoStack().add(new LoadingData(data));
        shape.print(data);
    }
	public String Undo(){
        if (data.getUndoStack().size()>1){
        	data.getRedoStack().add(data.getUndoStack().pop());
            LoadingData temp =data.getUndoStack().peek();
            data.renewData(temp);
            return help.sendToFront(temp);
        }else if(data.getUndoStack().size() == 1) {
        	data.getRedoStack().add(data.getUndoStack().pop());
            data.setLines(new ArrayList<LineSegment>());
        	data.setRectangles(new ArrayList<Rectangle>());
        	data.setSquares(new ArrayList<Square>());
        	data.setCircles(new ArrayList<Circle>());
        	data.setEllipses(new ArrayList<Ellipse>());
        	data.setTriangles(new ArrayList<Triangle>());


        	data.setShapesStack(new Stack<String>());
        	data.renewData(new LoadingData());
        	LoadingData d = new LoadingData(data);
        	return help.sendToFront( new LoadingData(data));
        }
        return null;
    }
    public org.json.JSONArray handleLoading(org.json.JSONArray jsonArray){
        data.renewData(new LoadingData());
        org.json.JSONArray temp=new org.json.JSONArray();
        jsonArray.remove(jsonArray.length()-1);
        JSONObject jsonObject=jsonArray.getJSONObject(jsonArray.length()-1);
        jsonArray.remove(jsonArray.length()-1);int n=0;
        int i=0;
        while(i<jsonArray.length()){
            String operation="Operation"+n;
            String name=jsonObject.getString(operation);
           for(int j=0;j<jsonArray.length();j++){
                if(jsonArray.getJSONObject(j).getString("id").equalsIgnoreCase(name)) {
                    temp.put(n, jsonArray.getJSONObject(j));n++;jsonArray.remove(j);
                    break;
                }
            }
        }
        return temp;
    }

    public String Redo(){
        if (!data.getRedoStack().empty()){
            LoadingData temp = data.getRedoStack().pop();
            data.getUndoStack().add(temp);
            data.renewData(temp);
            return help.sendToFront(temp);
        }
        return null;
    }
    
    public String load() {
    	
		return help.sendToFront(new LoadingData(data));
    	
    }
    

    public void resize(double selectedX,double selectedY,double scalar){
        Selector s= help.lastOne(help.select(selectedX,selectedY,data), data.getShapesStack());
        if (s!=null){
            shape = factory.getShape(s.getName());
            shape.resize(s.getIndex(), data, scalar);
            data.getUndoStack().add(new LoadingData(data));
            help.removeandaddlasttoStack(s.getId(), data);
        }
    }


    public void Delete(double pointX,double pointY){
        Selector s= help.lastOne(help.select(pointX,pointY,data), data.getShapesStack());
        if (s!=null){
            shape = factory.getShape(s.getName());
            shape.delete(s.getIndex(),data);
            data.getUndoStack().add(new LoadingData(data));
            help.removeElementsfromStack(s.getId(), data);
        }
    }


    public void Copy(double selectedX,double selectedY,double pointX,double pointY){
        Selector s= help.lastOne(help.select(selectedX,selectedY,data), data.getShapesStack());
        if (s!=null){
            shape = factory.getShape(s.getName());
            shape.copy(selectedX,selectedY,pointX,pointY,s.getIndex(),data);
            data.getUndoStack().add(new LoadingData(data));
            help.addlasttoStack(data);
        }
    }
    
    
    public void Move(double selectedX,double selectedY,double pointX,double pointY){
        Selector s= help.lastOne(help.select(selectedX,selectedY,data), data.getShapesStack());
        if (s!=null){
            shape = factory.getShape(s.getName());
            shape.move(selectedX,selectedY,pointX,pointY,s.getIndex(),data);
            data.getUndoStack().add(new LoadingData(data));
            help.removeandaddlasttoStack(s.getId(), data);
        }
    }

}


