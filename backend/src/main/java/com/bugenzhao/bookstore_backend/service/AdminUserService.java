package com.bugenzhao.bookstore_backend.service;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.User;

public interface AdminUserService {
    List<User> findAll();

    boolean patchById(long userId, User patch);
}
