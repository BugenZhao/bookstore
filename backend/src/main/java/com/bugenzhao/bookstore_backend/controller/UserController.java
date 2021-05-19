package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.entity.RegisterInfo;
import com.bugenzhao.bookstore_backend.service.UserService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/users/")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/check")
    public AuthedUser check(HttpServletRequest request) throws Exception {
        var authedUser = SessionUtils.getAuth(request);
        return authedUser;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginInfo info, HttpServletRequest request) throws Exception {
        return userService.checkLoginInfo(info).map((userAuth) -> {
            if (userAuth.isBanned()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body((Void) null);
            } else {
                SessionUtils.setAuth(request, new AuthedUser(userAuth));
                return ResponseEntity.ok((Void) null);
            }
        }).orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterInfo info, HttpServletRequest request) throws Exception {
        return userService.register(info).map((userAuth) -> {
            SessionUtils.setAuth(request, new AuthedUser(userAuth));
            return ResponseEntity.ok((Void) null);
        }).orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null));
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        SessionUtils.removeAuth(request);
    }
}
