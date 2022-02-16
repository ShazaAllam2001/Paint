package oop.paintback.database;
public class Selector {
    private String name;
    private String id;
    private int index;
    public Selector(String name,String id,int index){
        this.name=name;
        this.id=id;
        this.index=index;
    }

    public String getName() {
        return name;
    }

    public int getIndex() {
        return index;
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
