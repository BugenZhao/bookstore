package com.bugenzhao.bookstore_backend.dao.impl;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.dao.BookDao;
import com.bugenzhao.bookstore_backend.entity.db.Book;
import com.bugenzhao.bookstore_backend.repository.BookRepository;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Repository;

@Repository
public class BookDaoImpl implements BookDao {
    final BookRepository repo;

    public BookDaoImpl(BookRepository repo) {
        this.repo = repo;
    }

    @Override
    public Page<Book> findAll(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public Page<Book> search(String keyword, Pageable pageable) {
        var exampleBook = Book.builder().name(keyword).author(keyword).description(keyword).type(keyword).build();
        var matcher = ExampleMatcher.matchingAny().withStringMatcher(StringMatcher.CONTAINING).withIgnoreCase();
        var example = Example.of(exampleBook, matcher);
        return repo.findAll(example, pageable);
    }

    @Override
    public Optional<Book> findById(long bookId) {
        return repo.findById(bookId);
    }

    @Override
    public Book getOne(long bookId) {
        return repo.getOne(bookId);
    }

    @Override
    public Book saveAndFlush(Book book) {
        return repo.saveAndFlush(book);
    }
}
