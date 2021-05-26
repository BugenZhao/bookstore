package com.bugenzhao.bookstore_backend.controller;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.UserWithSpending;
import com.bugenzhao.bookstore_backend.service.AdminOrderService;
import com.bugenzhao.bookstore_backend.utils.JsonViews;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/stat/")
public class AdminStatController {
    AdminOrderService orderService;

    public AdminStatController(AdminOrderService orderService) {
        this.orderService = orderService;
    }

    @JsonView(JsonViews.Admin.class)
    @GetMapping("/sales")
    public List<BookWithCount> statSalesBetween(@RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) Date from,
            @RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) Date to) {
        return orderService.statSalesBetween(from, to);
    }

    @JsonView(JsonViews.Admin.class)
    @GetMapping("/spendings")
    public List<UserWithSpending> statUserSpendingsBetween(@RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) Date from,
            @RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) Date to) {
        return orderService.statUserSpendingsBetween(from, to);
    }
}
