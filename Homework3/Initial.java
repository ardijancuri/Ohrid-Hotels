import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

class Smestuvanje {

    String id;
    double x;
    double y;
    String name;

    public Smestuvanje(String line) {
        String[] parts = line.split("\\t");
        this.id = parts[0];
        this.x = Double.parseDouble(parts[1]);
        this.y = Double.parseDouble(parts[2]);
        this.name = parts[3];
    }

    @Override
    public String toString() {
        return "Smestuvanje{" +
                "id='" + id + '\'' +
                ", x=" + x +
                ", y=" + y +
                ", name='" + name + '\'' +
                '}' + '\n';
    }
}

public class Initial {

    public static List<Smestuvanje> get(InputStream inputStream) {
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
        return br.lines()
                .map(line -> new Smestuvanje(line))
                .collect(Collectors.toList());
    }

    public static double euclideanDistance(double x1, double y1, double x2, double y2) {
        double euclideanDistance = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        return euclideanDistance;
    }

    public static List<String> nearestFive(double x, double y, List<Smestuvanje> list){
        List<String> nearestFive = new ArrayList<String>();

        List<Double> results = new ArrayList<>();
        HashMap<Double, String> hashMap = new HashMap<Double, String>();
        for(Smestuvanje s : list) {
            double euclideanDistance = euclideanDistance(s.x, s.y, x, y);
            hashMap.put(euclideanDistance, s.name);
            results.add(euclideanDistance);
        }
        Collections.sort(results);
        for(int i=0;i<5;i++) {
            nearestFive.add(hashMap.get(results.get(i)));
        }
        return nearestFive;
    }

    public static void main(String[] args) throws IOException{

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        File file = new File("src/smestuvanja.txt");
        List<Smestuvanje> list = get(new FileInputStream(file));

        String line = br.readLine();
        String[] parts = line.split("\\s+");
        double x_coordinate = Double.parseDouble(parts[0]);
        double y_coordinate = Double.parseDouble(parts[1]);

        List<String> nearest5 = nearestFive(x_coordinate, y_coordinate, list);

        System.out.println(nearest5);
    }
}
