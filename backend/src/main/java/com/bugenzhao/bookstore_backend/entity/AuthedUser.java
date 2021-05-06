package com.bugenzhao.bookstore_backend.entity;

public class AuthedUser {
    public int user_id;
    public String username;
    public int user_type;

    public AuthedUser(int user_id, String username, int user_type) {
        this.user_id = user_id;
        this.username = username;
        this.user_type = user_type;
    }
}
