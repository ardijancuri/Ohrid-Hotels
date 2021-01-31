package com.example.hotels.Hotels.service;

import com.example.hotels.Hotels.HotelsSingleton;
import com.example.hotels.Hotels.response.HotelResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelsService {

    public List<HotelResponse> getNearbyHotels(double x,double y){
        return HotelsSingleton.getInstance().getNearby(x,y);
    }
}
