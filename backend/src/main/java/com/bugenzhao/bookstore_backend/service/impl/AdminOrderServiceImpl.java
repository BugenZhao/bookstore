package com.bugenzhao.bookstore_backend.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.UserWithSpending;
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

    @Override
    public List<BookWithCount> statSalesBetween(Date from, Date to) {
        var orders = orderRepo.findAll().stream()
                .filter(o -> o.getCreatedAt().compareTo(from) >= 0 && o.getCreatedAt().compareTo(to) <= 0)
                .collect(Collectors.toList());
        var sales = orders.stream().flatMap(o -> o.getItems().stream())
                .collect(Collectors.groupingBy(i -> i.getBook(), Collectors.summingLong(i -> i.getQuantity())))
                .entrySet().stream().map(e -> new BookWithCount(e.getKey(), e.getValue())).collect(Collectors.toList());
        sales.sort((l, r) -> -l.getCount().compareTo(r.getCount()));

        return sales;
    }

    public List<UserWithSpending> statUserSpendingsBetween(Date from, Date to) {
        var orders = orderRepo.findAll().stream()
                .filter(o -> o.getCreatedAt().compareTo(from) >= 0 && o.getCreatedAt().compareTo(to) <= 0)
                .collect(Collectors.toList());
        var spendings = orders.stream()
                .collect(Collectors.groupingBy(o -> o.getUser(),
                        Collectors.reducing(BigDecimal.ZERO, o -> o.getTotalPrice(), BigDecimal::add)))
                .entrySet().stream().map(e -> new UserWithSpending(e.getKey(), e.getValue()))
                .collect(Collectors.toList());

        return spendings;
    }
}
