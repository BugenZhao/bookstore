package com.bugenzhao.bookstore_backend.service.impl;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.bugenzhao.bookstore_backend.dao.BookDao;
import com.bugenzhao.bookstore_backend.dao.CartDao;
import com.bugenzhao.bookstore_backend.dao.UserDao;
import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.CartResponse;
import com.bugenzhao.bookstore_backend.entity.db.Cart;
import com.bugenzhao.bookstore_backend.entity.db.CartItem;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
@Transactional
public class CartServiceImpl implements CartService {
    final CartDao cartDao;
    final UserDao userDao;
    final BookDao bookDao;

    final AuthedUser auth;

    public CartServiceImpl(CartDao cartDao, UserDao userDao, BookDao bookDao, HttpServletRequest request) {
        this.cartDao = cartDao;
        this.userDao = userDao;
        this.bookDao = bookDao;
        this.auth = SessionUtils.getAuth(request).get();
    }

    @Override
    public void addABook(long bookId) {
        var cart = getOrCreateCart();
        var book = bookDao.getOne(bookId);
        var newItem = CartItem.builder().book(book).build();

        cart.getItems().add(newItem);
        cartDao.save(cart);
    }

    @Override
    public void deleteBooks(long bookId) {
        var cart = getOrCreateCart();

        cart.getItems().removeIf((item) -> item.getBook().getId() == bookId);
        cartDao.save(cart);
    }

    @Override
    public void empty() {
        cartDao.deleteByUser_Id(auth.getUserId());
    }

    private Cart getOrCreateCart() {
        var user = userDao.getOne(auth.getUserId());

        var cart = cartDao.findByUser_Id(auth.getUserId()).orElseGet(() -> {
            var newCart = Cart.builder().user(user).items(new HashSet<>()).build();
            return cartDao.save(newCart);
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

        return new CartResponse(bookWithCounts, BigDecimal.valueOf(discount), BigDecimal.valueOf(total - discount));
    }

    @Override
    public CartResponse get() {
        var cart = getOrCreateCart();
        var items = cart.getItems();
        return itemsToResponse(items);
    }

    @Override
    public CartResponse getThenEmpty() {
        var cart = get();
        empty();
        return cart;
    }
}
