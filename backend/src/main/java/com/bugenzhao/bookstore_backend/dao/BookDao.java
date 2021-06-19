package com.bugenzhao.bookstore_backend.dao;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookDao {
    Optional<Book> findById(long bookId);

    Page<Book> findAll(Pageable pageable);

    Page<Book> search(String keyword, Pageable pageable);

    Book getOne(long bookId);

    Book saveAndFlush(Book book);
}
