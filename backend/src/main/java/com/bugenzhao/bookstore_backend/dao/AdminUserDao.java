package com.bugenzhao.bookstore_backend.dao;

import java.util.List;
import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.User;

public interface AdminUserDao {
    List<User> findAll();

    Optional<User> findById(Long id);

    User saveAndFlush(User user);
}
