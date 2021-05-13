package com.bugenzhao.bookstore_backend.controller;

import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.Cart;
import com.bugenzhao.bookstore_backend.service.BookService;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.service.OrderService;

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
    final BookService bookService;
    final CartService cartService;
    final OrderService orderService;

    public CartController(BookService bookService, CartService cartService, OrderService orderService) {
        this.bookService = bookService;
        this.cartService = cartService;
        this.orderService = orderService;
    }

    @GetMapping("/")
    public Cart getCart() {
        var cart = cartService.get();
        var books = cart.entrySet().stream()
                .map((e) -> new BookWithCount(bookService.findById(e.getKey()).get(), e.getValue()))
                .filter((b) -> b.book != null).collect(Collectors.toList());
        var total = books.stream().map((b) -> b.book.price * b.count).reduce(0.0, Double::sum);
        var discount = Double.min(total * 0.3, 100.0);

        return new Cart(books, discount, total - discount);
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
    public void checkout() {
        var cart = getCart();
        orderService.newOrder(cart);
        emptyCart();
    }
}
