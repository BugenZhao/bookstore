package com.bugenzhao.bookstore_backend.repository;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Cart;

import org.springframework.data.repository.Repository;

public interface CartRepository extends Repository<Cart, Long> {
    Optional<Cart> findByUser_Id(long userId);

    Cart save(Cart newCart);

    void deleteByUser_Id(long userId);
}
