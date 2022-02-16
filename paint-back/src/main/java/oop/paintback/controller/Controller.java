package oop.paintback.controller;
import oop.paintback.services.HelpMethods;
import oop.paintback.services.MainMethodsServices;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
public class Controller {
    MainMethodsServices serve = new MainMethodsServices();
    HelpMethods help = new HelpMethods();
    @PostMapping("/create")
    public void post(@RequestBody String jsonString){
        JSONObject jsonObject=new JSONObject(jsonString);
        serve.handle(jsonObject.getString("name"),jsonObject.getString("id"),jsonString);
        //serve.save("Shape.json",jsonString);
    }
    @PostMapping("/loading")
    public void loading(@RequestBody String jsonString){
        JSONArray jsonArray=new JSONArray(jsonString);
        JSONArray temp=serve.handleLoading(jsonArray);
        System.out.println(temp);
        for(int i=0;i<temp.length();i++)
            serve.handle(temp.getJSONObject(i).getString("name"),temp.getJSONObject(i).getString("id"),temp.getJSONObject(i).toString());
    }
    @PostMapping("/move")
    public void move(@RequestBody String jsonString){
        double points[]=help.Points(jsonString);
        serve.Move(points[0],points[1],points[2],points[3]);
    }
    @PostMapping("/copy")
    public void copy(@RequestBody String jsonString){
        System.out.println(jsonString);
        double points[]=help.Points(jsonString);
        serve.Copy(points[0],points[1],points[2],points[3]);
    }
    @PostMapping("/delete")
    public void delete(@RequestBody String jsonString){
        JSONObject jsonObject=new JSONObject(jsonString);
        double pointX=jsonObject.getDouble("x");
        double pointY=jsonObject.getDouble("y");
        serve.Delete(pointX,pointY);
    }
    @GetMapping("/undo")
    public String undo(){
        String jsonString=serve.Undo();
        System.out.println(jsonString);
        return jsonString;
    }
    @GetMapping("/redo")
    public String redo(){
        String jsonString=serve.Redo();
        System.out.println(jsonString);
        return jsonString;
    }
    @GetMapping("/load")
    public String load(){
        String jsonString=serve.load();
        System.out.println(jsonString);
        return jsonString;
    }
    @PostMapping("/resize")
    public void resize(@RequestBody String jsonString){
        JSONObject jsonObject=new JSONObject(jsonString);
        JSONObject pos1=jsonObject.getJSONObject("pos1");
        double pointX=pos1.getDouble("x");
        double pointY=pos1.getDouble("y");
        double scalar = jsonObject.getDouble("Scalar");
        serve.resize(pointX, pointY, scalar);
    }
}
