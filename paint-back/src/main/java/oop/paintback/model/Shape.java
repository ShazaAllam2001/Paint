package oop.paintback.model;

import oop.paintback.database.LoadingData;
import oop.paintback.database.RunningData;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.*;

public abstract class Shape implements Cloneable {
    protected String outlineColor;
    protected String id;

    public String getOutlineColor() { return outlineColor; }
    public String getId() { return id; }

    public void setOutlineColor(String color) { this.outlineColor = color; }
    public void setId(String id) { this.id = id; }

    public abstract void copy(double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data);
    public abstract void move( double selectedX, double selectedY, double pointX, double pointY, int index, RunningData data);
    public abstract void addNewShape(String jsonString, RunningData data);
    public abstract void delete (int index, RunningData data);
    public abstract void resize(int index, RunningData data, double scalar);
    public abstract org.json.JSONObject dataToString (LoadingData data,int index);
    public abstract void print (RunningData data);
    public abstract boolean CheckIn(double pointx, double pointy, Object shape);

    public void save(String jsonString){
        JSONArray jsonArray=new JSONArray(jsonString);
        String name=jsonArray.getJSONObject(0).getString("name");
        try{
            FileWriter fw=new FileWriter(name+".txt");
            BufferedWriter bw=new BufferedWriter(fw);
            for(int i=0;i<jsonArray.length();i++){
                bw.write(jsonArray.getJSONObject(i).toString());
                bw.newLine();
            }
            bw.close();
            fw.close();
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }
    public String load(String name){
        JSONArray jsonArray=new JSONArray();
        try{
            FileReader fr=new FileReader(name+".txt");
            BufferedReader br=new BufferedReader(fr);
            String temp= br.readLine();
            while (temp!=null){
                JSONObject obj=new JSONObject(temp);
                jsonArray.put(obj);
                temp=br.readLine();
            }
            br.close();
            fr.close();
        }catch (IOException e){
            e.printStackTrace();
        }
        return jsonArray.toString();
    }
    public Object clone(){
        Object clone=null;
        try {
            clone=super.clone();
        }
        catch (CloneNotSupportedException e){
            e.printStackTrace();
        }
        return clone;
    }

}

