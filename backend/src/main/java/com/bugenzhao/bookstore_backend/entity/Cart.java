package com.bugenzhao.bookstore_backend.entity;

import java.util.List;

public class Cart {
    public List<BookWithCount> books;
    public double discount;
    public double total;

    public Cart(List<BookWithCount> books, double discount, double total) {
        this.books = books;
        this.discount = discount;
        this.total = total;
    }
}
