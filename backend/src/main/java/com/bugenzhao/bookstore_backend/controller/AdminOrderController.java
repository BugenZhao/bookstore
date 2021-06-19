package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.PagingResponse;
import com.bugenzhao.bookstore_backend.entity.db.Order;
import com.bugenzhao.bookstore_backend.service.AdminOrderService;
import com.bugenzhao.bookstore_backend.utils.JsonViews;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/orders/")
public class AdminOrderController {
    final AdminOrderService orderService;

    public AdminOrderController(AdminOrderService orderService) {
        this.orderService = orderService;
    }

    @JsonView(JsonViews.Admin.class)
    @GetMapping("/")
    public PagingResponse<Order> getAllBooks(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        var orders = orderService.findAll(PageRequest.of(page, size));
        return new PagingResponse<>(orders.getContent(), orders.getTotalElements());
    }
}
