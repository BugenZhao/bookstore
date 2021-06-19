package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.PagingResponse;
import com.bugenzhao.bookstore_backend.entity.db.Book;
import com.bugenzhao.bookstore_backend.service.BookService;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/books/")
public class BookController {
    final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/")
    public PagingResponse<Book> getAllBooks(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) throws Exception {
        var books = bookService.findAll(PageRequest.of(page, size));
        return new PagingResponse<>(books.getContent(), books.getTotalElements());
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<Book> getBook(@PathVariable long bookId) throws Exception {
        return bookService.findById(bookId).map((book) -> ResponseEntity.ok(book))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
}
