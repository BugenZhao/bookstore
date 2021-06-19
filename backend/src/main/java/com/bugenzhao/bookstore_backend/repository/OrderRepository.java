package com.bugenzhao.bookstore_backend.repository;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

public interface OrderRepository extends Repository<Order, Long> {
    Page<Order> findByUser_Id(long userId, Pageable pageable);

    List<Order> findByUser_IdAndCreatedAtBetween(long userId, Date from, Date to);

    Order save(Order order);
}
