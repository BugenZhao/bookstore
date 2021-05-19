package com.bugenzhao.bookstore_backend.service;

import com.bugenzhao.bookstore_backend.entity.Cart;

public interface CartService {
    void addABook(long bookId);

    void deleteBooks(long bookId);

    void empty();

    Cart get();

    Cart getByOrderId(long orderId);

    boolean checkout();
}
