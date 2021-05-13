package com.bugenzhao.bookstore_backend.service.impl;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Random;

import com.bugenzhao.bookstore_backend.entity.Cart;
import com.bugenzhao.bookstore_backend.entity.Order;
import com.bugenzhao.bookstore_backend.entity.OrderStatus;
import com.bugenzhao.bookstore_backend.service.OrderService;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class OrderServiceImpl implements OrderService {
    List<Order> orders = Collections.synchronizedList(new ArrayList<>());

    @Override
    public List<Order> findAll() {
        return Collections.unmodifiableList(orders);
    }

    @Override
    public boolean newOrder(Cart cart) {
        if (cart.books.isEmpty()) {
            return false;
        }
        var datetime = Date.from(Instant.now());
        var datetimeFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        var id = datetimeFormat.format(datetime);
        var consignee = "Bugen Zhao";
        var status = OrderStatus.values()[new Random().nextInt(OrderStatus.values().length)];

        var order = new Order(id, datetime, cart, consignee, status);
        orders.add(order);
        return true;
    }
}
