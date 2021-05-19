package com.bugenzhao.bookstore_backend.repository;

import java.util.List;
import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;

import org.springframework.data.repository.Repository;

public interface BookRepository extends Repository<Book, Long> {
    Optional<Book> findById(long bookId);

    List<Book> findAll();

    Book getOne(long bookId);
}
