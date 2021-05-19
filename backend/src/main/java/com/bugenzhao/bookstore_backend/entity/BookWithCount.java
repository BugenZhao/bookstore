package com.bugenzhao.bookstore_backend.entity;

import com.bugenzhao.bookstore_backend.entity.db.Book;

import lombok.*;

@Data
@AllArgsConstructor
public class BookWithCount {
    private Book book;
    private long count;
}
