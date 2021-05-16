package com.bugenzhao.bookstore_backend.service;

import java.util.List;
import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;

public interface BookService {
    Optional<Book> findById(int bookId);

    List<Book> findAll();
}
