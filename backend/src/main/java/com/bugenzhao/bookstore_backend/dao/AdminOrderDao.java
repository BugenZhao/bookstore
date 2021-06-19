package com.bugenzhao.bookstore_backend.dao;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminOrderDao {
    Page<Order> findAll(Pageable pageable);

    List<Order> findByCreatedAtBetween(Date from, Date to);
}
