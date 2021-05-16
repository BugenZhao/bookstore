package com.bugenzhao.bookstore_backend.entity.db.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.bugenzhao.bookstore_backend.entity.OrderStatus;
import com.bugenzhao.bookstore_backend.entity.db.Order;

import org.springframework.jdbc.core.RowMapper;

public class OrderRowMapper implements RowMapper<Order> {
    @Override
    public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Order(rs.getInt("id"), rs.getInt("user_id"), rs.getTimestamp("created_at"),
                rs.getString("consignee"), OrderStatus.values()[rs.getInt("status")]);
    }
}
