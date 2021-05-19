package com.bugenzhao.bookstore_backend.entity.db;

import java.math.BigDecimal;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String isbn;
    private String name;
    private String type;
    private String author;
    @DecimalMin(value = "0.00")
    private BigDecimal price;
    private String description;
    @Min(value = 0)
    private int inventory;
    private String image;
}
