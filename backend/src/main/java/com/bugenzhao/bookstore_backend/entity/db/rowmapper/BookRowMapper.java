package com.bugenzhao.bookstore_backend.entity.db.rowmapper;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.bugenzhao.bookstore_backend.entity.db.Book;

public class BookRowMapper implements RowMapper<Book> {
    @Override
    public Book mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Book(rs.getLong("id"), rs.getString("isbn"), rs.getString("name"), rs.getString("type"),
                rs.getString("author"), rs.getBigDecimal("price"), rs.getString("description"), rs.getInt("inventory"),
                rs.getString("image"));
    }
}
