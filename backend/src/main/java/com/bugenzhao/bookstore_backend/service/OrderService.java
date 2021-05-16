package com.bugenzhao.bookstore_backend.service;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.OrderResponse;

public interface OrderService {
    List<OrderResponse> findAll();
}
