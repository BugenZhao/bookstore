package com.bugenzhao.bookstore_backend.service.impl;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.entity.UserAuth;
import com.bugenzhao.bookstore_backend.rowmapper.UserAuthRowMapper;
import com.bugenzhao.bookstore_backend.service.UserService;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    JdbcTemplate jdbcTemplate;

    public UserServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<UserAuth> checkLoginInfo(LoginInfo info) {
        var result = jdbcTemplate.query("select * from user_auths where username = ? and password = ?",
                new UserAuthRowMapper(), info.username, info.password);
        return result.stream().findFirst();
    }
}
