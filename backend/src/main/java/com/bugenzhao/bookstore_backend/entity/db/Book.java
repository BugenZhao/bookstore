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

    @NotNull
    private String isbn;

    @NotNull
    private String name;

    @NotNull
    private String type;

    @NotNull
    private String author;

    @NotNull
    @DecimalMin(value = "0.00")
    private BigDecimal price;

    @NotNull
    private String description;

    @NotNull
    @Min(value = 0)
    private Integer inventory;

    @NotNull
    private String image;
}
