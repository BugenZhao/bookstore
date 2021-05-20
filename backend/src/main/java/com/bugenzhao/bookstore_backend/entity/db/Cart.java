package com.bugenzhao.bookstore_backend.entity.db;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @NotNull
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    @NotNull
    private Set<CartItem> items;
}
