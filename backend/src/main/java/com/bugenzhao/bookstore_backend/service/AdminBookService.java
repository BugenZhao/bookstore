package com.bugenzhao.bookstore_backend.service;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;

public interface AdminBookService {
    boolean patchById(long bookId, Book patch);

    Optional<Book> put(Book book);

    void deleteById(long bookId);
}
