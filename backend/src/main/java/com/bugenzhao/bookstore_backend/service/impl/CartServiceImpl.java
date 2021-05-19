package com.bugenzhao.bookstore_backend.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.CartResponse;
import com.bugenzhao.bookstore_backend.entity.db.Cart;
import com.bugenzhao.bookstore_backend.entity.db.CartItem;
import com.bugenzhao.bookstore_backend.repository.BookRepository;
import com.bugenzhao.bookstore_backend.repository.CartRepository;
import com.bugenzhao.bookstore_backend.repository.UserAuthRepository;
import com.bugenzhao.bookstore_backend.service.BookService;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CartServiceImpl implements CartService {
    BookService bookService;
    JdbcTemplate jdbcTemplate;
    CartRepository repo;
    UserAuthRepository userAuthRepo;
    BookRepository bookRepo;

    AuthedUser user;

    public CartServiceImpl(BookService bookService, JdbcTemplate jdbcTemplate, CartRepository cartRepository,
            UserAuthRepository userAuthRepo, BookRepository bookRepo, HttpServletRequest request) {
        this.bookService = bookService;
        this.jdbcTemplate = jdbcTemplate;
        this.repo = cartRepository;
        this.userAuthRepo = userAuthRepo;
        this.bookRepo = bookRepo;
        this.user = SessionUtils.getAuth(request);
    }

    @Override
    public void addABook(long bookId) {
        var cart = getOrCreateCart();
        var book = bookRepo.getOne(bookId);
        var newItem = CartItem.builder().book(book).build();

        cart.getItems().add(newItem);
        repo.save(cart);
    }

    @Override
    public void deleteBooks(long bookId) {
        var cart = getOrCreateCart();

        cart.getItems().removeIf((item) -> item.getBook().getId() == bookId);
        repo.save(cart);
    }

    @Override
    public void empty() {
        var cart = getOrCreateCart();

        cart.getItems().clear();
        repo.save(cart);
    }

    private Map<Integer, Integer> getMap() {
        var list = jdbcTemplate.queryForList(
                "select book_id, count(*) count from carts where user_id = ? and order_id is null group by book_id",
                user.getUserId());
        var map = list.stream().collect(
                Collectors.toMap((m) -> (Integer) m.get("book_id"), (m) -> ((Long) m.get("count")).intValue()));
        return map;
    }

    private Map<Integer, Integer> getMapByOrderId(long orderId) {
        var list = jdbcTemplate.queryForList(
                "select book_id, count(*) count from carts where user_id = ? and order_id = ? group by book_id",
                user.getUserId(), orderId);
        var map = list.stream().collect(
                Collectors.toMap((m) -> (Integer) m.get("book_id"), (m) -> ((Long) m.get("count")).intValue()));
        return map;
    }

    private long newOrder() {
        var consignee = "Bugen Zhao";

        var keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                var ps = con.prepareStatement("insert into orders (user_id, consignee) values (?, ?)",
                        new String[] { "id" });
                ps.setLong(1, user.getUserId());
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
                user.getUserId());
        return true;
    }

    private Cart getOrCreateCart() {
        var userAuth = userAuthRepo.getOne(user.getUserId());

        var cart = repo.findByUser_Id(user.getUserId()).orElseGet(() -> {
            var newCart = Cart.builder().user(userAuth).build();
            return repo.save(newCart);
        });

        return cart;
    }

    private CartResponse itemsToResponse(Set<CartItem> items) {
        var bookToCounts = items.stream().map((item) -> item.getBook())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        var bookWithCounts = bookToCounts.entrySet().stream().map((e) -> new BookWithCount(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
        var total = bookWithCounts.stream().map((b) -> b.getBook().getPrice().doubleValue() * b.getCount()).reduce(0.0,
                Double::sum);
        var discount = Double.min(total * 0.3, 100.0);

        return new CartResponse(bookWithCounts, discount, total - discount);
    }

    @Override
    public CartResponse get() {
        var cart = getOrCreateCart();
        var items = cart.getItems();
        return itemsToResponse(items);
    }

    @Override
    public CartResponse getByOrderId(long orderId) {
        throw new UnsupportedOperationException();
    }

}
