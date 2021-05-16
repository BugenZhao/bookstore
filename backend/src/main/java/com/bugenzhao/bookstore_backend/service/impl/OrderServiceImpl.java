package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.OrderResponse;
import com.bugenzhao.bookstore_backend.entity.db.rowmapper.OrderRowMapper;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.service.OrderService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class OrderServiceImpl implements OrderService {
    CartService cartService;
    JdbcTemplate jdbcTemplate;
    AuthedUser user;

    public OrderServiceImpl(CartService cartService, JdbcTemplate jdbcTemplate) {
        this.cartService = cartService;
        this.jdbcTemplate = jdbcTemplate;

        var attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        this.user = SessionUtils.getAuth(attr.getRequest());
    }

    @Override
    public List<OrderResponse> findAll() {
        var orderIds = jdbcTemplate.query("select * from orders where user_id = ? order by created_at desc",
                new OrderRowMapper(), user.userId);
        return orderIds.stream().map((raw) -> {
            var orderId = raw.id;
            var cart = cartService.getByOrderId(orderId);
            return new OrderResponse(raw.id, raw.createdAt, cart, raw.consignee, raw.status);
        }).collect(Collectors.toList());
    }
}
