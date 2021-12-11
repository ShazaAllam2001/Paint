package oop.paintback.model;

import oop.paintback.database.LoadingData;
import oop.paintback.database.RunningData;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.*;

public abstract class Shape implements Cloneable {
    protected String outlineColor;

    public String getOutlineColor() { return outlineColor; }

    public void setOutlineColor(String color) { this.outlineColor = color; }

}

