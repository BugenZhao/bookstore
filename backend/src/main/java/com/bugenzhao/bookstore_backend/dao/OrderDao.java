package com.bugenzhao.bookstore_backend.dao;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

public interface OrderDao {
    List<Order> findByUser_Id(long userId);

    List<Order> findByUser_IdAndCreatedAtBetween(long userId, Date from, Date to);

    Order save(Order order);
}
