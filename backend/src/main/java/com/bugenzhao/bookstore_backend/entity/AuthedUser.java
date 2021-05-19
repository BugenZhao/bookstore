package com.bugenzhao.bookstore_backend.entity;

import com.bugenzhao.bookstore_backend.entity.db.UserAuth;
import com.bugenzhao.bookstore_backend.entity.db.UserType;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Data
@AllArgsConstructor
public class AuthedUser {
    @JsonProperty("user_id")
    private Long userId;
    private String username;
    @JsonProperty("user_type")
    private UserType userType;

    public AuthedUser(UserAuth userAuth) {
        this.userId = userAuth.getId();
        this.username = userAuth.getUsername();
        this.userType = userAuth.getType();
    }
}
