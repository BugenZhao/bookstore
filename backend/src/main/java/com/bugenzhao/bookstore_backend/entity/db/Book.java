package com.bugenzhao.bookstore_backend.entity.db;

import java.math.BigDecimal;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String isbn;

    private String name;

    private String type;

    private String author;

    @DecimalMin(value = "0.00")
    private BigDecimal price;

    private String description;

    @Min(value = 0)
    private Integer inventory;

    private String image;
}
