package com.example.hotels.Hotels.api;

import com.example.hotels.Hotels.response.HotelResponse;
import com.example.hotels.Hotels.service.HotelsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/hotels")
public class HotelsController {

    private HotelsService service;
    public HotelsController(HotelsService service) {
        this.service=service;
    }

    @GetMapping("/nearest")
    public List<HotelResponse> searchPets(@RequestParam double x, @RequestParam double y) {
        return service.getNearbyHotels(x,y);
    }


}