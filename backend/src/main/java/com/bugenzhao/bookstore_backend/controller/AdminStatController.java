package com.bugenzhao.bookstore_backend.controller;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.FromTo;
import com.bugenzhao.bookstore_backend.entity.UserWithSpending;
import com.bugenzhao.bookstore_backend.service.AdminOrderService;
import com.bugenzhao.bookstore_backend.utils.JsonViews;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public List<BookWithCount> statSalesBetween(@RequestBody FromTo fromTo) throws Exception {
        return orderService.statSalesBetween(fromTo.getFrom(), fromTo.getTo());
    }

    @JsonView(JsonViews.Admin.class)
    @GetMapping("/spendings")
    public List<UserWithSpending> statUserSpendingsBetween(@RequestBody FromTo fromTo) throws Exception {
        return orderService.statUserSpendingsBetween(fromTo.getFrom(), fromTo.getTo());
    }
}
