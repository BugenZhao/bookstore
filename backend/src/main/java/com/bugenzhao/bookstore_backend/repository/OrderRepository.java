package com.bugenzhao.bookstore_backend.repository;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.repository.Repository;

public interface OrderRepository extends Repository<Order, Long> {
    List<Order> findByUser_Id(long userId);

    List<Order> findByUser_IdAndCreatedAtBetween(long userId, Date from, Date to);

    Order save(Order order);
}
