package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.FromTo;
import com.bugenzhao.bookstore_backend.entity.OrdersSummary;
import com.bugenzhao.bookstore_backend.service.OrderService;
import com.bugenzhao.bookstore_backend.utils.JsonViews;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stat/")
public class StatController {
    OrderService orderService;

    public StatController(OrderService orderService) {
        this.orderService = orderService;
    }

    @JsonView(JsonViews.User.class)
    @GetMapping("/summary")
    public List<OrdersSummary> statOrdersBetween(@RequestBody FromTo fromTo) throws Exception {
        // TODO: implement this
        throw new Exception();
    }
}
