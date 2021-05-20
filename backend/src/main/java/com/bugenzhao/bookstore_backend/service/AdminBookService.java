package com.bugenzhao.bookstore_backend.service;

import com.bugenzhao.bookstore_backend.entity.db.Book;

public interface AdminBookService {
    void patchById(long bookId, Book patch);
}
