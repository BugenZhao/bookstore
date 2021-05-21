package com.bugenzhao.bookstore_backend.entity;

import java.math.BigDecimal;

import com.bugenzhao.bookstore_backend.entity.db.User;

import lombok.*;

@Data
@AllArgsConstructor
public class UserWithSpending {
    private User user;
    private BigDecimal spending;
}
