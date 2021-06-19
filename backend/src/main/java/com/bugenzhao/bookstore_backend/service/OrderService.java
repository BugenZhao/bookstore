package com.bugenzhao.bookstore_backend.service;

import java.util.Date;

import com.bugenzhao.bookstore_backend.entity.OrdersSummary;
import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    Page<Order> findAll(Pageable pageable);

    boolean checkout();

    OrdersSummary statOrdersBetween(Date from, Date to);
}
