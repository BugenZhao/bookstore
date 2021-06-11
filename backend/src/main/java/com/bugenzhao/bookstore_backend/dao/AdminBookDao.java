package com.bugenzhao.bookstore_backend.dao;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;

public interface AdminBookDao {
    Optional<Book> findById(Long id);

    Book save(Book book);

    Book saveAndFlush(Book book);

    void deleteById(Long id);
}
