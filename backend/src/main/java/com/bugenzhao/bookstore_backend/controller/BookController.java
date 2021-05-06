package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.rowmapper.BookRowMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
    public String getAllBooks() throws Exception {
        var result = jdbcTemplate.query("select * from books", new BookRowMapper());
        var map = result.stream().collect(Collectors.toMap((b) -> b.id, Function.identity()));
        return new ObjectMapper().writeValueAsString(map);
    }

    @RequestMapping("/{bookId}")
    public String getBook(@PathVariable(value = "bookId") String bookId) throws Exception {
        var result = jdbcTemplate.query("select * from books where id = ?", new BookRowMapper(), bookId);
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        var book = result.get(0);
        return new ObjectMapper().writeValueAsString(book);
    }
}
