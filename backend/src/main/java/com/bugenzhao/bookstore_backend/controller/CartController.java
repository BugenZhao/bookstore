package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.CartResponse;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.service.OrderService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart/")
public class CartController {
    final CartService cartService;
    final OrderService orderService;

    public CartController(CartService cartService, OrderService orderService) {
        this.cartService = cartService;
        this.orderService = orderService;
    }

    @GetMapping("/")
    public CartResponse getCart() {
        var cart = cartService.get();
        return cart;
    }

    @PutMapping("/{bookId}")
    public void putABook(@PathVariable int bookId) {
        cartService.addABook(bookId);
    }

    @DeleteMapping("/{bookId}")
    public void deleteBooks(@PathVariable int bookId) {
        cartService.deleteBooks(bookId);
    }

    @DeleteMapping("/")
    public void emptyCart() {
        cartService.empty();
    }

    @PostMapping("/checkout")
    public ResponseEntity<Void> checkout() {
        var ok = orderService.checkout();
        if (ok) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(null);
        }
    }
}
