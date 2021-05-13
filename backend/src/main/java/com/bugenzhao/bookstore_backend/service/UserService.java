package com.bugenzhao.bookstore_backend.service;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.entity.UserAuth;

public interface UserService {
    Optional<UserAuth> checkLoginInfo(LoginInfo info);
}
