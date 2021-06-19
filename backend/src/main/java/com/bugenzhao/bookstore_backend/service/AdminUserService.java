package com.bugenzhao.bookstore_backend.service;

import com.bugenzhao.bookstore_backend.entity.db.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminUserService {
    Page<User> findAll(Pageable pageable);

    boolean patchById(long userId, User patch);
}
