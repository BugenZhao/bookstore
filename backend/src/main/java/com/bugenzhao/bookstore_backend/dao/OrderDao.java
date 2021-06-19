package com.bugenzhao.bookstore_backend.dao;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderDao {
    Page<Order> findByUser_Id(long userId, Pageable pageable);

    List<Order> findByUser_IdAndCreatedAtBetween(long userId, Date from, Date to);

    Order save(Order order);
}
