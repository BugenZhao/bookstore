package com.bugenzhao.bookstore_backend.entity;

import java.math.BigDecimal;
import java.util.List;

import lombok.*;

@Data
@AllArgsConstructor
public class CartResponse {
    private List<BookWithCount> books;
    private BigDecimal discount;
    private BigDecimal total;
}
