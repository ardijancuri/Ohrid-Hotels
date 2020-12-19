package com.ohrid.stays;

import com.ohrid.stays.model.StayType;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

class Stay {

    String id;
    double x;
    double y;
    String name;

    public Stay(String line) {
        String[] parts = line.split("\\t");
        this.id = parts[0];
        this.x = Double.parseDouble(parts[1]);
        this.y = Double.parseDouble(parts[2]);
        this.name = parts[3];
    }

    @Override
    public String toString() {
        return "Stay{" +
                "id='" + id + '\'' +
                ", x=" + x +
                ", y=" + y +
                ", name='" + name + '\'' +
                '}' + '\n';
    }
}

public class StaysService {

    public List getStays(StayType type) throws FileNotFoundException {

        File file = new File("src/main/java/com/ohrid/stays/stays.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));

        List<Stay> list = br.lines()
                .map(line -> new Stay(line))
                .collect(Collectors.toList());

        List stays = new ArrayList();

        if(type.equals(StayType.HOTEL)) {
            for(int i=0;i<list.size();i++) {
                String name = list.get(i).name;
                if(name.contains("Hotel") || name.contains("HOTEL"))
                    stays.add(list.get(i));
            }

        } else if(type.equals(StayType.VILLA)) {
            for(int i=0;i<list.size();i++) {
                String name = list.get(i).name;
                if(name.contains("Villa"))
                    stays.add(list.get(i));
            }

        } else if(type.equals(StayType.HOSTEL)) {
            for(int i=0;i<list.size();i++) {
                String name = list.get(i).name;
                if(name.contains("Hostel"))
                    stays.add(list.get(i));
            }
        }

        return stays;
    }

}
