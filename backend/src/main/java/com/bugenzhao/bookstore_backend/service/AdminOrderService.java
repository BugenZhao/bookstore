package com.bugenzhao.bookstore_backend.service;

import java.util.Date;
import java.util.List;

import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.UserWithSpending;
import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminOrderService {
    Page<Order> findAll(Pageable pageable);

    List<BookWithCount> statSalesBetween(Date from, Date to);

    List<UserWithSpending> statUserSpendingsBetween(Date from, Date to);
}
