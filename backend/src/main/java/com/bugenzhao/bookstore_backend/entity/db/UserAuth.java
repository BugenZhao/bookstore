package com.bugenzhao.bookstore_backend.entity.db;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Data
@AllArgsConstructor
public class UserAuth {
    @JsonProperty("user_id")
    private long userId;
    private String username;
    private String password;
    @JsonProperty("user_type")
    private int userType;
    private boolean banned;
}
