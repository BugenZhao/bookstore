package com.bugenzhao.bookstore_backend.entity;

public class UserAuth {
    public int user_id;
    public String username;
    public String password;
    public int user_type;

    public UserAuth(int user_id, String username, String password, int user_type) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.user_type = user_type;
    }
}
