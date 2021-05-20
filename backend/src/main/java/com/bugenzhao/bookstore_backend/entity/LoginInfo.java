package com.bugenzhao.bookstore_backend.entity;

import lombok.*;

@Data
@AllArgsConstructor
public class LoginInfo {
    private String username; // username or email
    private String password;
}
