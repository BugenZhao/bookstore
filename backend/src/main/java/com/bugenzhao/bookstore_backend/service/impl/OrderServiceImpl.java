package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.db.Order;
import com.bugenzhao.bookstore_backend.entity.db.OrderItem;
import com.bugenzhao.bookstore_backend.entity.db.OrderStatus;
import com.bugenzhao.bookstore_backend.repository.OrderRepository;
import com.bugenzhao.bookstore_backend.repository.UserRepository;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.service.OrderService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
@Transactional
public class OrderServiceImpl implements OrderService {
    final CartService cartService;
    final UserRepository userRepo;
    final OrderRepository orderRepo;

    final AuthedUser auth;

    public OrderServiceImpl(CartService cartService, UserRepository userRepo, OrderRepository orderRepository,
            HttpServletRequest request) {
        this.cartService = cartService;
        this.userRepo = userRepo;
        this.orderRepo = orderRepository;
        this.auth = SessionUtils.getAuth(request).get();
    }

    @Override
    public List<Order> findAll() {
        return orderRepo.findByUser_Id(auth.getUserId());
    }

    @Override
    public boolean checkout() {
        var cart = cartService.getThenEmpty();
        if (cart.getBooks().isEmpty()) {
            return false;
        }

        var orderItems = cart.getBooks().stream()
                .map((bwc) -> OrderItem.builder().book(bwc.getBook()).quantity(bwc.getCount()).build())
                .collect(Collectors.toSet());
        var user = userRepo.getOne(auth.getUserId());
        var order = Order.builder().user(user).consignee("Bugen Zhao").status(OrderStatus.submitted).items(orderItems)
                .totalPrice(cart.getTotal()).build();

        orderRepo.save(order);
        return true;
    }
}
