package com.bugenzhao.bookstore_backend.repository;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.repository.Repository;

public interface OrderRepository extends Repository<Order, Long> {
    List<Order> findByUser_Id(long userId);

    Order save(Order order);
}
