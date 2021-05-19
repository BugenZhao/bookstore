package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.db.Order;
import com.bugenzhao.bookstore_backend.entity.db.OrderItem;
import com.bugenzhao.bookstore_backend.entity.db.OrderStatus;
import com.bugenzhao.bookstore_backend.repository.OrderRepository;
import com.bugenzhao.bookstore_backend.repository.UserAuthRepository;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.service.OrderService;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class OrderServiceImpl implements OrderService {
    final CartService cartService;
    final UserAuthRepository userAuthRepo;
    final OrderRepository orderRepo;

    final AuthedUser user;

    public OrderServiceImpl(CartService cartService, UserAuthRepository userAuthRepo, OrderRepository orderRepository,
            HttpServletRequest request) {
        this.cartService = cartService;
        this.userAuthRepo = userAuthRepo;
        this.orderRepo = orderRepository;
        this.user = SessionUtils.getAuth(request);
    }

    @Override
    public List<Order> findAll() {
        return orderRepo.findAll();
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
        var userAuth = userAuthRepo.getOne(user.getUserId());
        var order = Order.builder().user(userAuth).consignee("Bugen Zhao").status(OrderStatus.submitted)
                .items(orderItems).totalPrice(cart.getTotal()).build();

        orderRepo.save(order);
        return true;
    }
}
