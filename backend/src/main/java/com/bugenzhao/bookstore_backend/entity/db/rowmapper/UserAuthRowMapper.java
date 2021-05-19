package com.bugenzhao.bookstore_backend.entity.db.rowmapper;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.bugenzhao.bookstore_backend.entity.db.UserAuth;

public class UserAuthRowMapper implements RowMapper<UserAuth> {
    @Override
    public UserAuth mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new UserAuth(rs.getLong("user_id"), rs.getString("username"), rs.getString("password"),
                rs.getInt("user_type"), rs.getBoolean("banned"));
    }
}
