package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;
import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.Book;
import com.bugenzhao.bookstore_backend.rowmapper.BookRowMapper;
import com.bugenzhao.bookstore_backend.service.BookService;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {
    JdbcTemplate jdbcTemplate;

    public BookServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<Book> findById(int bookId) {
        var result = jdbcTemplate.query("select * from books where id = ?", new BookRowMapper(), bookId);
        return result.stream().findFirst();
    }

    @Override
    public List<Book> findAll() {
        var result = jdbcTemplate.query("select * from books", new BookRowMapper());
        return result;
    }
}
