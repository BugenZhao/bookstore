package com.bugenzhao.bookstore_backend.rowmapper;

import com.bugenzhao.bookstore_backend.entity.Book;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BookRowMapper implements RowMapper<Book> {
    @Override
    public Book mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Book(
                rs.getInt("id"),
                rs.getString("isbn"),
                rs.getString("name"),
                rs.getString("type"),
                rs.getString("author"),
                rs.getDouble("price"),
                rs.getString("description"),
                rs.getInt("inventory"),
                rs.getString("image")
        );
    }
}