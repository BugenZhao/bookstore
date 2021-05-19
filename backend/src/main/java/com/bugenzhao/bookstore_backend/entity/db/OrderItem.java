package com.bugenzhao.bookstore_backend.entity.db;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @ManyToOne
    private Book book;

    @Builder.Default
    private Long quantity = 0l;
}
