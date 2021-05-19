package com.bugenzhao.bookstore_backend.entity;

import java.util.Date;

import com.bugenzhao.bookstore_backend.entity.db.OrderStatus;

import lombok.*;

@Data
@AllArgsConstructor
public class OrderResponse {
    private long id;
    private Date datetime;
    private CartResponse cart;
    private String consignee;
    private OrderStatus status;
}
