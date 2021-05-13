package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.Book;
import com.bugenzhao.bookstore_backend.rowmapper.BookRowMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/books/")
public class BookController {
    JdbcTemplate jdbcTemplate;

    public BookController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @RequestMapping("/")
    public Map<Integer, Book> getAllBooks() throws Exception {
        var result = jdbcTemplate.query("select * from books", new BookRowMapper());
        var map = result.stream().collect(Collectors.toMap((b) -> b.id, Function.identity()));
        return map;
    }

    @RequestMapping("/{bookId}")
    public ResponseEntity<Book> getBook(@PathVariable(value = "bookId") String bookId) throws Exception {
        var result = jdbcTemplate.query("select * from books where id = ?", new BookRowMapper(), bookId);
        if (result.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        var book = result.get(0);
        return ResponseEntity.ok(book);
    }
}
