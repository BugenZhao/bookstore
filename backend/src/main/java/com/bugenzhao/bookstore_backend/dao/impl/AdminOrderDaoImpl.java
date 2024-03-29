package com.bugenzhao.bookstore_backend.dao.impl;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.dao.AdminOrderDao;
import com.bugenzhao.bookstore_backend.entity.db.Order;
import com.bugenzhao.bookstore_backend.repository.AdminOrderRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class AdminOrderDaoImpl implements AdminOrderDao {
    final AdminOrderRepository repo;

    public AdminOrderDaoImpl(AdminOrderRepository repo) {
        this.repo = repo;
    }

    @Override
    public Page<Order> findAll(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public List<Order> findByCreatedAtBetween(Date from, Date to) {
        return repo.findByCreatedAtBetween(from, to);
    }
}
