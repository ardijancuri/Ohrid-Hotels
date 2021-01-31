package com.example.hotels.Hotels;

import com.example.hotels.Hotels.response.HotelResponse;

import java.util.ArrayList;

public class HotelsSingleton {
    private static HotelsSingleton instance;
    private ArrayList<HotelResponse> hotels;

    private HotelsSingleton() {
        hotels = new ArrayList<>();
        hotels.add(new HotelResponse("Hotel Pela", "41.0764625 20.8034074"));
        hotels.add(new HotelResponse("Hotel Belvedere", "41.0788322 20.8023400"));
        hotels.add(new HotelResponse("Hotel na MVR", "41.0769862 20.8030131"));
        hotels.add(new HotelResponse("Hotel Garden", "41.1056053 20.8082706"));
        hotels.add(new HotelResponse("Hotel Riviera", "41.1121098 20.8016881"));
        hotels.add(new HotelResponse("Hotel Siti Palas", "41.1099144 20.8046742"));
        hotels.add(new HotelResponse("Hotel Mizo", "41.1192679 20.7845353"));
        hotels.add(new HotelResponse("Hotel Tino", "41.1089237 20.8058802"));
        hotels.add(new HotelResponse("Hotel & Spa Tino Sveti Stefan", "41.0760694 20.8035432"));
        hotels.add(new HotelResponse("Hotel International", "41.1070136 20.8152723"));
        hotels.add(new HotelResponse("Hotel Villa Jordan", "41.0900379 20.7990804"));
        hotels.add(new HotelResponse("Hotel Veronica", "41.1170005 20.8088839"));
        hotels.add(new HotelResponse("Hotel Manastri Sveti Stefan", "41.0737427 20.8042065"));
        hotels.add(new HotelResponse("Hotel Montenegrin Inn", "41.1181085 20.7997644"));
        hotels.add(new HotelResponse("Hotel Flamengo", "41.0764625 20.8034074"));
        hotels.add(new HotelResponse("Hotel Sky Corner", "41.1174368 20.8014938"));
        hotels.add(new HotelResponse("Hotel Village", "41.1222239 20.8091091"));
        hotels.add(new HotelResponse("Hotel Diplomat", "41.1074220 20.8095668"));
        hotels.add(new HotelResponse("Hotel Green Space", "41.1250537 20.7712139"));
        hotels.add(new HotelResponse("Hotel Daljan", "41.1222715 20.7740558"));
        hotels.add(new HotelResponse("Hotel Sileks", "41.0746758 20.8027351"));
        hotels.add(new HotelResponse("Hotel Beton", "41.0754796 20.8028050"));
        hotels.add(new HotelResponse("Hotel Slavija Spektar", "41.0789051 20.8007902"));
        hotels.add(new HotelResponse("Hotel Ineks Gorica", "41.0846970 20.7972458"));
        hotels.add(new HotelResponse("Hotel Aleksandrija", "41.1122203 20.7980025"));
        hotels.add(new HotelResponse("Hotel Kocarev", "41.1471777 20.7599981"));
        hotels.add(new HotelResponse("Hotel Park", "41.0900379 20.7990804"));
    }
    public static HotelsSingleton getInstance() {
        if (instance == null) {
            instance = new HotelsSingleton();
        }
        return instance;
    }

    public ArrayList<HotelResponse> getNearby(double x, double y) {
        ArrayList<HotelResponse> nearest = new ArrayList<>();
        for (HotelResponse hotel : hotels) {
            if (nearest.size() < 5) {
                nearest.add(hotel);
            } else {
                int index = Integer.MAX_VALUE;
                double value = Integer.MIN_VALUE;
                for (int i = 0; i < nearest.size(); i++) {
                    String[] hotelCordsArr = hotel.getCoordinates().split(" ");
                    String[] nearHotelCordsArr = nearest.get(i).getCoordinates().split(" ");
                    double hotelCordX = Double.parseDouble(hotelCordsArr[0]);
                    double hotelCordY = Double.parseDouble(hotelCordsArr[1]);
                    double nearHotelCordX = Double.parseDouble(nearHotelCordsArr[0]);
                    double nearHotelCordY = Double.parseDouble(nearHotelCordsArr[1]);
                    double distanceHotel = euclideanDistance(hotelCordX, hotelCordY, x, y);
                    double distanceNearHotel = euclideanDistance(nearHotelCordX, nearHotelCordY, x, y);
                    if (distanceHotel < distanceNearHotel && distanceNearHotel > value) {
                        index = i;
                        value = distanceNearHotel;
                    }
                }
                if (index != Integer.MAX_VALUE) {
                    nearest.remove(index);
                    nearest.add(hotel);
                }
            }
        }
        return nearest;
    }

    public double euclideanDistance(double x1, double y1, double x2, double y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
}
