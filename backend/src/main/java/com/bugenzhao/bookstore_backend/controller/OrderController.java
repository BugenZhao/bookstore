package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.OrderResponse;
import com.bugenzhao.bookstore_backend.service.OrderService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orders/")
public class OrderController {
    OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/")
    public List<OrderResponse> getAllOrders() throws Exception {
        return orderService.findAll();
    }
}
