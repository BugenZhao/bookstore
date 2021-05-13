package com.bugenzhao.bookstore_backend.service.impl;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.bugenzhao.bookstore_backend.service.CartService;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CartServiceImpl implements CartService {
    Map<Integer, Integer> cart = new ConcurrentHashMap<>();

    @Override
    public void addABook(int bookId) {
        cart.put(bookId, cart.getOrDefault(bookId, 0) + 1);
    }

    @Override
    public void deleteBooks(int bookId) {
        cart.remove(bookId);
    }

    @Override
    public void empty() {
        cart.clear();
    }

    @Override
    public Map<Integer, Integer> get() {
        return Collections.unmodifiableMap(cart);
    }
}
