package com.bugenzhao.bookstore_backend.repository;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser_Id(long userId);
}
