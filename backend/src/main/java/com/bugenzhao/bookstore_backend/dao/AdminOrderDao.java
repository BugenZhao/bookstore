package com.bugenzhao.bookstore_backend.dao;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

public interface AdminOrderDao {
    List<Order> findAll();

    List<Order> findByCreatedAtBetween(Date from, Date to);
}
