package com.bugenzhao.bookstore_backend.controller;

import com.bugenzhao.bookstore_backend.entity.PagingResponse;
import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.service.AdminUserService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/users/")
public class AdminUserController {
    final AdminUserService userService;

    public AdminUserController(AdminUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public PagingResponse<User> getAllUsers(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        var users = userService.findAll(PageRequest.of(page, size));
        return new PagingResponse<>(users.getContent(), users.getTotalElements());
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<Void> patchUser(@PathVariable long userId, @RequestBody User patch) {
        var ok = userService.patchById(userId, patch);
        if (ok) {
            SessionUtils.invalidateAuthForUser(userId);
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
        }
    }
}
