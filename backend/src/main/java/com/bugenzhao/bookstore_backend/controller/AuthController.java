package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/")
public class AuthController {
    JdbcTemplate jdbcTemplate;

    public AuthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @RequestMapping("/check")
    public String check() throws Exception {
        var mockUser = new AuthedUser(1, "thunderboy", 0);
        return new ObjectMapper().writeValueAsString(mockUser);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login() {
    }
}
