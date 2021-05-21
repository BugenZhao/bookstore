package com.bugenzhao.bookstore_backend.entity;

import java.math.BigDecimal;
import java.util.List;

import lombok.*;

@Data
@AllArgsConstructor
public class OrdersSummary {
    private List<BookWithCount> books;
    private BigDecimal total;
}
