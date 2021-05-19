package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;
import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;
import com.bugenzhao.bookstore_backend.repository.BookRepository;
import com.bugenzhao.bookstore_backend.service.BookService;

import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {
    BookRepository repo;

    public BookServiceImpl(BookRepository repo) {
        this.repo = repo;
    }

    @Override
    public Optional<Book> findById(long bookId) {
        return repo.findById(bookId);
    }

    @Override
    public List<Book> findAll() {
        return repo.findAll();
    }
}
