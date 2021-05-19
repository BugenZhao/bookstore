package com.bugenzhao.bookstore_backend.entity;

import java.util.List;

import lombok.*;

@Data
@AllArgsConstructor
public class Cart {
    private List<BookWithCount> books;
    private double discount;
    private double total;
}
