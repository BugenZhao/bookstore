package com.bugenzhao.bookstore_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/carousels/")
public class CarouselController {
    @RequestMapping("/")
    public List<String> getCarousels() throws Exception {
        var paths = IntStream.rangeClosed(1, 4).mapToObj((i) -> String.format("/resources/book%d.jpg", i))
                .collect(Collectors.toList());
        return paths;
    }
}
