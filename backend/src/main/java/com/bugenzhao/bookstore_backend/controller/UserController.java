package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.rowmapper.UserAuthRowMapper;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/users/")
public class UserController {
    JdbcTemplate jdbcTemplate;

    public UserController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @RequestMapping("/check")
    public AuthedUser check(HttpServletRequest request) throws Exception {
        var authedUser = SessionUtils.getAuth(request);
        return authedUser;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Void> login(@RequestBody LoginInfo info, HttpServletRequest request) throws Exception {
        var userAuths = jdbcTemplate.query("select * from user_auths where username = ? and password = ?",
                new UserAuthRowMapper(), info.username, info.password);
        if (!userAuths.isEmpty()) {
            var userAuth = userAuths.get(0);
            var authedUser = new AuthedUser(userAuth.userId, userAuth.username, userAuth.userType);
            SessionUtils.setAuth(request, authedUser);
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public void logout(HttpServletRequest request) {
        SessionUtils.removeAuth(request);
    }
}
