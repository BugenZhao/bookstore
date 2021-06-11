package com.bugenzhao.bookstore_backend.dao.impl;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.dao.CartDao;
import com.bugenzhao.bookstore_backend.entity.db.Cart;
import com.bugenzhao.bookstore_backend.repository.CartRepository;

import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao {
    final CartRepository repo;

    public CartDaoImpl(CartRepository repo) {
        this.repo = repo;
    }

    @Override
    public void deleteByUser_Id(long userId) {
        repo.deleteByUser_Id(userId);
    }

    @Override
    public Optional<Cart> findByUser_Id(long userId) {
        return repo.findByUser_Id(userId);
    }

    @Override
    public Cart save(Cart newCart) {
        return repo.save(newCart);
    }
}
