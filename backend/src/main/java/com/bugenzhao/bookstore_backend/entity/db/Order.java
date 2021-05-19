package com.bugenzhao.bookstore_backend.entity.db;

import java.util.Date;

import com.bugenzhao.bookstore_backend.entity.OrderStatus;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {
    private long id;
    private long userId;
    private Date createdAt;
    private String consignee;
    private OrderStatus status;
}
