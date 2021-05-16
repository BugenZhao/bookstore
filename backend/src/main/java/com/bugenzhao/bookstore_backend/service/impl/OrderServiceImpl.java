package com.bugenzhao.bookstore_backend.service.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.Order;
import com.bugenzhao.bookstore_backend.entity.OrderStatus;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.service.OrderService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

class RawOrder {
    public int id;
    public int userId;
    public Date createdAt;
    public String consignee;
    public OrderStatus status;

    public RawOrder(int id, int userId, Date createdAt, String consignee, OrderStatus status) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.consignee = consignee;
        this.status = status;
    }
}

class RawOrderRowMapper implements RowMapper<RawOrder> {
    @Override
    public RawOrder mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new RawOrder(rs.getInt("id"), rs.getInt("user_id"), rs.getTimestamp("created_at"),
                rs.getString("consignee"), OrderStatus.values()[rs.getInt("status")]);
    }
}

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
    public List<Order> findAll() {
        var orderIds = jdbcTemplate.query("select * from orders where user_id = ? order by created_at desc",
                new RawOrderRowMapper(), user.userId);
        return orderIds.stream().map((raw) -> {
            var orderId = raw.id;
            var cart = cartService.getByOrderId(orderId);
            return new Order(raw.id, raw.createdAt, cart, raw.consignee, raw.status);
        }).collect(Collectors.toList());
    }
}
