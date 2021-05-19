package com.bugenzhao.bookstore_backend.entity;

import java.util.Date;

import lombok.*;

@Data
@AllArgsConstructor
public class OrderResponse {
    private long id;
    private Date datetime;
    private Cart cart;
    private String consignee;
    private OrderStatus status;
}
