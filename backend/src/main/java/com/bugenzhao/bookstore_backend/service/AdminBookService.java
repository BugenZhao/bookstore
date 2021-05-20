package com.bugenzhao.bookstore_backend.service;

import com.bugenzhao.bookstore_backend.entity.db.Book;

public interface AdminBookService {
    boolean patchById(long bookId, Book patch);
}
