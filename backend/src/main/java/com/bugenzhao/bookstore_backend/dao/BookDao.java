package com.bugenzhao.bookstore_backend.dao;

import java.util.List;
import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;

public interface BookDao {
    Optional<Book> findById(long bookId);

    List<Book> findAll();

    Book getOne(long bookId);

    Book saveAndFlush(Book book);
}
