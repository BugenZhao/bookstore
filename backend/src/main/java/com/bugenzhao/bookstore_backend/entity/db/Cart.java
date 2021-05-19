package com.bugenzhao.bookstore_backend.entity.db;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

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

    @OneToOne(cascade = CascadeType.ALL)
    private UserAuth user;

    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL)
    private Set<CartItem> items = new HashSet<>();
}
