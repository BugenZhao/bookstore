package com.bugenzhao.bookstore_backend.service;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookService {
    Optional<Book> findById(long bookId);

    Page<Book> findAll(Pageable pageable);
}
