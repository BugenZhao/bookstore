package com.bugenzhao.bookstore_backend.entity;

import com.bugenzhao.bookstore_backend.entity.db.Book;

public class BookWithCount {
    public Book book;
    public int count;

    public BookWithCount(Book book, int count) {
        this.book = book;
        this.count = count;
    }
}
