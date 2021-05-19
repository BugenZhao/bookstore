package com.bugenzhao.bookstore_backend.service.impl;

import java.math.BigDecimal;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.CartResponse;
import com.bugenzhao.bookstore_backend.entity.db.Cart;
import com.bugenzhao.bookstore_backend.entity.db.CartItem;
import com.bugenzhao.bookstore_backend.repository.BookRepository;
import com.bugenzhao.bookstore_backend.repository.CartRepository;
import com.bugenzhao.bookstore_backend.repository.UserAuthRepository;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CartServiceImpl implements CartService {
    final CartRepository cartRepo;
    final UserAuthRepository userAuthRepo;
    final BookRepository bookRepo;

    final AuthedUser user;

    public CartServiceImpl(CartRepository cartRepository, UserAuthRepository userAuthRepo, BookRepository bookRepo,
            HttpServletRequest request) {
        this.cartRepo = cartRepository;
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
        cartRepo.save(cart);
    }

    @Override
    public void deleteBooks(long bookId) {
        var cart = getOrCreateCart();

        cart.getItems().removeIf((item) -> item.getBook().getId() == bookId);
        cartRepo.save(cart);
    }

    @Override
    public void empty() {
        var cart = getOrCreateCart();

        cart.getItems().clear();
        cartRepo.save(cart);
    }

    private Cart getOrCreateCart() {
        var userAuth = userAuthRepo.getOne(user.getUserId());

        var cart = cartRepo.findByUser_Id(user.getUserId()).orElseGet(() -> {
            var newCart = Cart.builder().user(userAuth).build();
            return cartRepo.save(newCart);
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
