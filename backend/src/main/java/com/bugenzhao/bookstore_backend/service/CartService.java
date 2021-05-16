package com.bugenzhao.bookstore_backend.service;

import com.bugenzhao.bookstore_backend.entity.Cart;

public interface CartService {
    void addABook(int bookId);

    void deleteBooks(int bookId);

    void empty();

    Cart get();

    Cart getByOrderId(int orderId);

    boolean checkout();
}
