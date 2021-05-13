package com.bugenzhao.bookstore_backend.service;

import java.util.Map;

public interface CartService {
    void addABook(int bookId);

    void deleteBooks(int bookId);

    void empty();

    Map<Integer, Integer> get();
}
