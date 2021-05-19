package com.bugenzhao.bookstore_backend.repository;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Cart;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser_Id(long userId);
}
