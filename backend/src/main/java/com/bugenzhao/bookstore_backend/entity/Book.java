package com.bugenzhao.bookstore_backend.entity;

public class Book {
    public int id;
    public String isbn;
    public String name;
    public String type;
    public String author;
    public double price;
    public String description;
    public int inventory;
    public String image;

    public Book(int id, String isbn, String name, String type, String author, double price, String description,
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
