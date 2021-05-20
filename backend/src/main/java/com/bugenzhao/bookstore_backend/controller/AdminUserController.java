package com.bugenzhao.bookstore_backend.controller;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.service.AdminUserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/users/")
public class AdminUserController {
    AdminUserService userService;

    public AdminUserController(AdminUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public Map<Long, User> getAllUsers() throws Exception {
        return userService.findAll().stream().collect(Collectors.toMap(User::getId, Function.identity()));
    }

    @PatchMapping("/{userId}")
    public void patchUser(@PathVariable long userId, @RequestBody User patch) {
        userService.patchById(userId, patch);
    }
}
