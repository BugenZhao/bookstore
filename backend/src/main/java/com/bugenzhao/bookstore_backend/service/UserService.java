package com.bugenzhao.bookstore_backend.service;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.entity.RegisterInfo;
import com.bugenzhao.bookstore_backend.entity.db.User;

public interface UserService {
    Optional<User> findByUsername(String username);

    Optional<User> checkLoginInfo(LoginInfo info);

    Optional<User> register(RegisterInfo info);
}
