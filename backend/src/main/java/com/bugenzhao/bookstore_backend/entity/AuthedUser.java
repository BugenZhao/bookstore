package com.bugenzhao.bookstore_backend.entity;

import com.bugenzhao.bookstore_backend.entity.db.UserAuth;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Data
@AllArgsConstructor
public class AuthedUser {
    @JsonProperty("user_id")
    private long userId;
    private String username;
    @JsonProperty("user_type")
    private int userType;

    public AuthedUser(UserAuth userAuth) {
        this.userId = userAuth.getUserId();
        this.username = userAuth.getUsername();
        this.userType = userAuth.getUserType();
    }
}
