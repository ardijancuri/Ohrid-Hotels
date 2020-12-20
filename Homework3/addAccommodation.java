import java.io.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.Map;

public class addAccommodation {

    public static String rightFormat(String accommodationData) {
        String finalLine = "";
        String[] parts = accommodationData.split(" ");

        for(int i=0;i<parts.length;i++){
            if(i<=2)
                finalLine += parts[i]+"\t";
            else if(i>2 && i!= parts.length)
                finalLine +=parts[i]+" ";
            else
                finalLine +=parts[i];
        }
        return finalLine;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        File file = new File("src/smestuvanja.txt");
        FileWriter fw = new FileWriter(file, true);
        PrintWriter pw = new PrintWriter(fw);

        String accommodationData = br.readLine();
        String[] parts = accommodationData.split(" ");

        //pw.println(rightFormat(accommodationData));
        //pw.close();

        HashMap<String, String> map = new HashMap<>();

        try {
            BufferedReader b = new BufferedReader(new FileReader("src/smestuvanja.txt"));

            String line;
            while ((line = b.readLine()) != null) {
                String[] part = line.split("\t");
                map.put(part[0],part[1]);
            }

            b.close();

        } catch (IOException ex) {
            ex.printStackTrace();
        }

        if(map.containsKey(parts[0])){
            System.out.println("Accommodation with this Id already exists");
        }
        else{
            pw.println(rightFormat(accommodationData));
            pw.close();
        }

    }

}
