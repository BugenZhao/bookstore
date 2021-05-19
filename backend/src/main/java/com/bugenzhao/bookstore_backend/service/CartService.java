package com.bugenzhao.bookstore_backend.service;

import com.bugenzhao.bookstore_backend.entity.CartResponse;

public interface CartService {
    void addABook(long bookId);

    void deleteBooks(long bookId);

    void empty();

    CartResponse get();

    CartResponse getByOrderId(long orderId);

    boolean checkout();
}
