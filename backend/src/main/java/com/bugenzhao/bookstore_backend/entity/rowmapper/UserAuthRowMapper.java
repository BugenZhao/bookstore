package com.bugenzhao.bookstore_backend.entity.rowmapper;

import com.bugenzhao.bookstore_backend.entity.UserAuth;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserAuthRowMapper implements RowMapper<UserAuth> {
    @Override
    public UserAuth mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new UserAuth(rs.getInt("user_id"), rs.getString("username"), rs.getString("password"),
                rs.getInt("user_type"));
    }
}
