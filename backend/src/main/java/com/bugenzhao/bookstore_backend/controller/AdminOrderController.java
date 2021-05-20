package com.bugenzhao.bookstore_backend.controller;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;
import com.bugenzhao.bookstore_backend.service.AdminOrderService;
import com.bugenzhao.bookstore_backend.utils.JsonViews;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/orders/")
public class AdminOrderController {
    AdminOrderService orderService;

    public AdminOrderController(AdminOrderService orderService) {
        this.orderService = orderService;
    }

    @JsonView(JsonViews.Admin.class)
    @GetMapping("/")
    public List<Order> getAllOrders() throws Exception {
        return orderService.findAll();
    }
}
