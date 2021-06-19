package com.bugenzhao.bookstore_backend.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.dao.AdminOrderDao;
import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.UserWithSpending;
import com.bugenzhao.bookstore_backend.entity.db.Order;
import com.bugenzhao.bookstore_backend.service.AdminOrderService;
import com.bugenzhao.bookstore_backend.utils.OrderUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
@Transactional
public class AdminOrderServiceImpl implements AdminOrderService {
    final AdminOrderDao orderDao;

    public AdminOrderServiceImpl(AdminOrderDao orderDao) {
        this.orderDao = orderDao;
    }

    @Override
    public Page<Order> findAll(Pageable pageable) {
        return orderDao.findAll(pageable);
    }

    @Override
    public List<BookWithCount> statSalesBetween(Date from, Date to) {
        var orders = orderDao.findByCreatedAtBetween(from, to);
        var sales = OrderUtils.ordersToSales(orders);

        return sales;
    }

    @Override
    public List<UserWithSpending> statUserSpendingsBetween(Date from, Date to) {
        var orders = orderDao.findByCreatedAtBetween(from, to);
        var spendings = orders.stream()
                .collect(Collectors.groupingBy(o -> o.getUser(),
                        Collectors.reducing(BigDecimal.ZERO, o -> o.getTotalPrice(), BigDecimal::add)))
                .entrySet().stream().map(e -> new UserWithSpending(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
        spendings.sort((l, r) -> -l.getSpending().compareTo(r.getSpending()));

        return spendings;
    }
}
