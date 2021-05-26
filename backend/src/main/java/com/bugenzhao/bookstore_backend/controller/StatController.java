package com.bugenzhao.bookstore_backend.controller;

import java.util.Date;

import com.bugenzhao.bookstore_backend.entity.OrdersSummary;
import com.bugenzhao.bookstore_backend.service.OrderService;
import com.bugenzhao.bookstore_backend.utils.JsonViews;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stat/")
public class StatController {
    OrderService orderService;

    public StatController(OrderService orderService) {
        this.orderService = orderService;
    }

    @JsonView(JsonViews.User.class)
    @GetMapping("/summary")
    public OrdersSummary statOrdersBetween(@RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) Date from,
            @RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) Date to) throws Exception {
        return orderService.statOrdersBetween(from, to);
    }
}
