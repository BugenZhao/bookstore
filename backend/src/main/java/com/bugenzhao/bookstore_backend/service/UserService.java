package com.bugenzhao.bookstore_backend.service;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.entity.RegisterInfo;
import com.bugenzhao.bookstore_backend.entity.UserAuth;

public interface UserService {
    Optional<UserAuth> findByUsername(String username);

    Optional<UserAuth> checkLoginInfo(LoginInfo info);

    Optional<UserAuth> register(RegisterInfo info);
}
