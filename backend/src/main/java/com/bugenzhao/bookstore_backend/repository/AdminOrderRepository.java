package com.bugenzhao.bookstore_backend.repository;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminOrderRepository extends JpaRepository<Order, Long>, OrderRepository {
    List<Order> findByCreatedAtBetween(Date from, Date to);
}
