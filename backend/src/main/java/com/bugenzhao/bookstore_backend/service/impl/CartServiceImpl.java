package com.bugenzhao.bookstore_backend.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.Cart;
import com.bugenzhao.bookstore_backend.service.BookService;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CartServiceImpl implements CartService {
    BookService bookService;
    JdbcTemplate jdbcTemplate;
    AuthedUser user;

    public CartServiceImpl(BookService bookService, JdbcTemplate jdbcTemplate) {
        this.bookService = bookService;
        this.jdbcTemplate = jdbcTemplate;

        var attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        this.user = SessionUtils.getAuth(attr.getRequest());
    }

    @Override
    public void addABook(int bookId) {
        jdbcTemplate.update("insert into carts(user_id, book_id) values (?, ?)", user.userId, bookId);
    }

    @Override
    public void deleteBooks(int bookId) {
        jdbcTemplate.update("delete from carts where user_id = ? and book_id = ? and order_id is null", user.userId,
                bookId);
    }

    @Override
    public void empty() {
        jdbcTemplate.update("delete from carts where user_id = ? and order_id is null", user.userId);
    }

    private Map<Integer, Integer> getMap() {
        var list = jdbcTemplate.queryForList(
                "select book_id, count(*) count from carts where user_id = ? and order_id is null group by book_id",
                user.userId);
        var map = list.stream().collect(
                Collectors.toMap((m) -> (Integer) m.get("book_id"), (m) -> ((Long) m.get("count")).intValue()));
        return map;
    }

    private Map<Integer, Integer> getMapByOrderId(int orderId) {
        var list = jdbcTemplate.queryForList(
                "select book_id, count(*) count from carts where user_id = ? and order_id = ? group by book_id",
                user.userId, orderId);
        var map = list.stream().collect(
                Collectors.toMap((m) -> (Integer) m.get("book_id"), (m) -> ((Long) m.get("count")).intValue()));
        return map;
    }

    private int newOrder() {
        var consignee = "Bugen Zhao";

        var keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                var ps = con.prepareStatement("insert into orders (user_id, consignee) values (?, ?)",
                        new String[] { "id" });
                ps.setInt(1, user.userId);
                ps.setString(2, consignee);
                return ps;
            }
        }, keyHolder);

        return (int) keyHolder.getKey();
    }

    @Override
    public boolean checkout() {
        var map = this.getMap();
        if (map.isEmpty()) {
            return false;
        }

        var orderId = newOrder();
        jdbcTemplate.update("update carts set order_id = ? where user_id = ? and order_id is null", orderId,
                user.userId);
        return true;
    }

    private Cart mapToCart(Map<Integer, Integer> map) {
        var books = map.entrySet().stream()
                .map((e) -> new BookWithCount(bookService.findById(e.getKey()).get(), e.getValue()))
                .filter((b) -> b.book != null).collect(Collectors.toList());
        var total = books.stream().map((b) -> b.book.price.doubleValue() * b.count).reduce(0.0, Double::sum);
        var discount = Double.min(total * 0.3, 100.0);

        return new Cart(books, discount, total - discount);
    }

    @Override
    public Cart get() {
        return mapToCart(getMap());
    }

    @Override
    public Cart getByOrderId(int orderId) {
        return mapToCart(getMapByOrderId(orderId));
    }

}
