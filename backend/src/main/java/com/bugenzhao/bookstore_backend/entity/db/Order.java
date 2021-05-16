package com.bugenzhao.bookstore_backend.entity.db;

import java.util.Date;

import com.bugenzhao.bookstore_backend.entity.OrderStatus;

public class Order {
    public int id;
    public int userId;
    public Date createdAt;
    public String consignee;
    public OrderStatus status;

    public Order(int id, int userId, Date createdAt, String consignee, OrderStatus status) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.consignee = consignee;
        this.status = status;
    }
}
