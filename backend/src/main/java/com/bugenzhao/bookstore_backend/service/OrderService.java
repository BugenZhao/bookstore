package com.bugenzhao.bookstore_backend.service;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.Cart;
import com.bugenzhao.bookstore_backend.entity.Order;

public interface OrderService {
    List<Order> findAll();

    boolean newOrder(Cart cart);
}
