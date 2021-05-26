package com.bugenzhao.bookstore_backend.entity;

import lombok.*;

@Data
@AllArgsConstructor
public class RegisterInfo {
    private String username;
    private String email;
    private String password;
}
