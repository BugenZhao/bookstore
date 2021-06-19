package com.bugenzhao.bookstore_backend.repository;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

public interface BookRepository extends Repository<Book, Long> {
    Optional<Book> findById(long bookId);

    Page<Book> findAll(Pageable pageable);

    Book getOne(long bookId);

    Book saveAndFlush(Book book);
}
