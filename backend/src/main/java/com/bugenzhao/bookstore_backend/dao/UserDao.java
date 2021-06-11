package com.bugenzhao.bookstore_backend.dao;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.User;

public interface UserDao {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameAndPassword(String username, String password);

    Optional<User> findByEmailAndPassword(String email, String password);

    User getOne(Long userId);

    User save(User userToSave);
}
