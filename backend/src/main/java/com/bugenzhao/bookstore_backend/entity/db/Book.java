package com.bugenzhao.bookstore_backend.entity.db;

import java.math.BigDecimal;

public class Book {
    public int id;
    public String isbn;
    public String name;
    public String type;
    public String author;
    public BigDecimal price;
    public String description;
    public int inventory;
    public String image;

    public Book(int id, String isbn, String name, String type, String author, BigDecimal price, String description,
            int inventory, String image) {
        this.id = id;
        this.isbn = isbn;
        this.name = name;
        this.type = type;
        this.author = author;
        this.price = price;
        this.description = description;
        this.inventory = inventory;
        this.image = image;
    }
}
