package com.bugenzhao.bookstore_backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthedUser {
    @JsonProperty("user_id")
    public int userId;

    public String username;

    @JsonProperty("user_type")
    public int userType;

    public AuthedUser(int userId, String username, int userType) {
        this.userId = userId;
        this.username = username;
        this.userType = userType;
    }

    public AuthedUser(UserAuth userAuth) {
        this.userId = userAuth.userId;
        this.username = userAuth.username;
        this.userType = userAuth.userType;
    }
}
