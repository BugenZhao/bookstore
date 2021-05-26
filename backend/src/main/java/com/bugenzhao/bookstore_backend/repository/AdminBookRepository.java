package com.bugenzhao.bookstore_backend.repository;

import com.bugenzhao.bookstore_backend.entity.db.Book;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminBookRepository extends JpaRepository<Book, Long> {

}
