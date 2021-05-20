package com.bugenzhao.bookstore_backend.service;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

public interface AdminOrderService {
    List<Order> findAll();
}
