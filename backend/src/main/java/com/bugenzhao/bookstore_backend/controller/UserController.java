package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.rowmapper.UserAuthRowMapper;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/users/")
public class UserController {
    JdbcTemplate jdbcTemplate;

    public UserController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @RequestMapping("/check")
    public String check(HttpServletRequest request) throws Exception {
        var authedUser = SessionUtils.getAuth(request);
        return new ObjectMapper().writeValueAsString(authedUser);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody LoginInfo info, HttpServletRequest request) throws Exception {
        var userAuth = jdbcTemplate.queryForObject("select * from user_auths where username = ? and password = ?",
                new UserAuthRowMapper(), info.username, info.password);
        if (userAuth != null) {
            var authedUser = new AuthedUser(userAuth.user_id, userAuth.username, userAuth.user_type);
            SessionUtils.setAuth(request, authedUser);
            return new ObjectMapper().writeValueAsString(authedUser);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public void logout(HttpServletRequest request) {
        SessionUtils.removeAuth(request);
    }
}
