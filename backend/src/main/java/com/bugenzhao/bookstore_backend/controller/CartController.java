package com.bugenzhao.bookstore_backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.Book;
import com.bugenzhao.bookstore_backend.service.BookService;
import com.bugenzhao.bookstore_backend.service.CartService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

class BookWithCount {
    public Book book;
    public int count;

    public BookWithCount(Book book, int count) {
        this.book = book;
        this.count = count;
    }
}

class CartResponse {
    public List<BookWithCount> books;
    public double discount;
    public double total;

    public CartResponse(List<BookWithCount> books, double discount, double total) {
        this.books = books;
        this.discount = discount;
        this.total = total;
    }
}

@RestController
@RequestMapping("/cart/")
public class CartController {
    BookService bookService;
    CartService cartService;

    public CartController(BookService bookService, CartService cartService) {
        this.bookService = bookService;
        this.cartService = cartService;
    }

    @RequestMapping("/")
    public CartResponse getCart() {
        var cart = cartService.get();
        var books = cart.entrySet().stream()
                .map((e) -> new BookWithCount(bookService.findById(e.getKey()).get(), e.getValue()))
                .filter((b) -> b.book != null).collect(Collectors.toList());
        var total = books.stream().map((b) -> b.book.price * b.count).reduce(0.0, Double::sum);
        var discount = Double.min(total * 0.3, 100.0);

        return new CartResponse(books, discount, total - discount);
    }

    @RequestMapping(value = "/{bookId}", method = RequestMethod.PUT)
    public void putABook(@PathVariable int bookId) {
        cartService.addABook(bookId);
    }

    @RequestMapping(value = "/{bookId}", method = RequestMethod.DELETE)
    public void deleteBooks(@PathVariable int bookId) {
        cartService.deleteBooks(bookId);
    }

    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    public void emptyCart() {
        cartService.empty();
    }

    @RequestMapping(value = "/checkout", method = RequestMethod.POST)
    public void checkout() {
        emptyCart();
    }
}
