package com.bugenzhao.bookstore_backend.dao;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Cart;

public interface CartDao {
    Optional<Cart> findByUser_Id(long userId);

    Cart save(Cart newCart);

    void deleteByUser_Id(long userId);
}
