package com.bugenzhao.bookstore_backend.repository;

import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminOrderRepository extends JpaRepository<Order, Long> {

}
