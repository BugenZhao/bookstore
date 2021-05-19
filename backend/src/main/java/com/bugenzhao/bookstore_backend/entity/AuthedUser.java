package com.bugenzhao.bookstore_backend.entity;

import com.bugenzhao.bookstore_backend.entity.db.User;
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

    public AuthedUser(User user) {
        this.userId = user.getId();
        this.username = user.getUsername();
        this.userType = user.getType();
    }
}
