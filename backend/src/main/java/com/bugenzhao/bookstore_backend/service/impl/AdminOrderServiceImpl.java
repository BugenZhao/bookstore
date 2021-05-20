package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.Order;
import com.bugenzhao.bookstore_backend.repository.AdminOrderRepository;
import com.bugenzhao.bookstore_backend.service.AdminOrderService;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
@Transactional
public class AdminOrderServiceImpl implements AdminOrderService {
    final AdminOrderRepository orderRepo;

    public AdminOrderServiceImpl(AdminOrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    @Override
    public List<Order> findAll() {
        return orderRepo.findAll();
    }
}
