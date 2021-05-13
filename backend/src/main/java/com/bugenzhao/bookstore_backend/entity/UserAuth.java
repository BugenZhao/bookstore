package com.bugenzhao.bookstore_backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserAuth {
    @JsonProperty("user_id")
    public int userId;

    public String username;

    public String password;

    @JsonProperty("user_type")
    public int userType;

    public UserAuth(int userId, String username, String password, int userType) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.userType = userType;
    }
}
