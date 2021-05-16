package com.bugenzhao.bookstore_backend.service.impl;

import java.util.Map;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CartServiceImpl implements CartService {
    JdbcTemplate jdbcTemplate;
    AuthedUser user;

    public CartServiceImpl(JdbcTemplate jdbcTemplate) {
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
        jdbcTemplate.update("delete from carts where user_id = ? and book_id = ?", user.userId, bookId);
    }

    @Override
    public void empty() {
        jdbcTemplate.update("delete from carts where user_id = ?", user.userId);
    }

    @Override
    public Map<Integer, Integer> get() {
        var list = jdbcTemplate.queryForList(
                "select book_id, count(*) count from carts where user_id = ? group by book_id", user.userId);
        var map = list.stream().collect(
                Collectors.toMap((m) -> (Integer) m.get("book_id"), (m) -> ((Long) m.get("count")).intValue()));
        return map;
    }
}
