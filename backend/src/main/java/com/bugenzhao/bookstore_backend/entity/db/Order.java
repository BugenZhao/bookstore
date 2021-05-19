package com.bugenzhao.bookstore_backend.entity.db;

import java.util.Date;

import com.bugenzhao.bookstore_backend.entity.OrderStatus;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private Long id;
    private Long userId;
    private Date createdAt;
    private String consignee;
    private OrderStatus status;
}
