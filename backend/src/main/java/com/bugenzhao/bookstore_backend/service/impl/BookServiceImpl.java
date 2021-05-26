package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;
import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;
import com.bugenzhao.bookstore_backend.repository.BookRepository;
import com.bugenzhao.bookstore_backend.service.BookService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    BookRepository bookRepo;

    public BookServiceImpl(BookRepository repo) {
        this.bookRepo = repo;
    }

    @Override
    public Optional<Book> findById(long bookId) {
        return bookRepo.findById(bookId);
    }

    @Override
    public List<Book> findAll() {
        return bookRepo.findAll();
    }
}
