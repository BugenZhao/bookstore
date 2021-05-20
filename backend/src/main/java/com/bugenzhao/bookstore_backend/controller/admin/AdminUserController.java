package com.bugenzhao.bookstore_backend.controller.admin;

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
@RequestMapping("/admin/users/")
public class AdminUserController {
    UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String getAllUsers() throws Exception {
        return "233";
    }
}
