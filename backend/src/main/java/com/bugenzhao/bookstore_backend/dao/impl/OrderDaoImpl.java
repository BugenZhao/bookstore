package com.bugenzhao.bookstore_backend.dao.impl;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.dao.OrderDao;
import com.bugenzhao.bookstore_backend.entity.db.Order;
import com.bugenzhao.bookstore_backend.repository.OrderRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDaoImpl implements OrderDao {
    final OrderRepository repo;

    public OrderDaoImpl(OrderRepository repo) {
        this.repo = repo;
    }

    @Override
    public Page<Order> findByUser_Id(long userId, Pageable pageable) {
        return repo.findByUser_Id(userId, pageable);
    }

    @Override
    public List<Order> findByUser_IdAndCreatedAtBetween(long userId, Date from, Date to) {
        return repo.findByUser_IdAndCreatedAtBetween(userId, from, to);
    }

    @Override
    public Order save(Order order) {
        return repo.save(order);
    }
}
