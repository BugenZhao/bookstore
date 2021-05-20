package com.bugenzhao.bookstore_backend.controller;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.db.Book;
import com.bugenzhao.bookstore_backend.service.AdminBookService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/books/")
public class AdminBookController {
    AdminBookService bookService;

    public AdminBookController(AdminBookService bookService) {
        this.bookService = bookService;
    }

    @PatchMapping("/{bookId}")
    public ResponseEntity<Void> patchUser(@PathVariable long bookId, @RequestBody Book patch) {
        var ok = bookService.patchById(bookId, patch);
        return ok ? ResponseEntity.ok(null) : ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
    }
}
