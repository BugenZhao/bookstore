package com.bugenzhao.bookstore_backend.entity;

import java.util.Date;

public class OrderResponse {
    public long id;
    public Date datetime;
    public Cart cart;
    public String consignee;
    public OrderStatus status;

    public OrderResponse(long id, Date datetime, Cart cart, String consignee, OrderStatus status) {
        this.id = id;
        this.datetime = datetime;
        this.cart = cart;
        this.consignee = consignee;
        this.status = status;
    }
}
