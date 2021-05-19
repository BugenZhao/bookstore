package com.bugenzhao.bookstore_backend.repository;

import com.bugenzhao.bookstore_backend.entity.db.Book;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
