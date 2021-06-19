package com.bugenzhao.bookstore_backend.dao;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminUserDao {
    Page<User> findAll(Pageable pageable);

    Optional<User> findById(Long id);

    User saveAndFlush(User user);
}
