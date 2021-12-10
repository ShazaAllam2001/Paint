package oop.paintback.model;

public abstract class Shape implements Cloneable {
    protected String outlineColor;

    public String getOutlineColor() {
        return outlineColor;
    }

    public void setOutlineColor(String color) {
        this.outlineColor = color;
    }
}

