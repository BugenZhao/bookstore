package com.bugenzhao.bookstore_backend.service;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.OrdersSummary;
import com.bugenzhao.bookstore_backend.entity.db.Order;

public interface OrderService {
    List<Order> findAll();

    boolean checkout();

    OrdersSummary statOrdersBetween(Date from, Date to);
}
