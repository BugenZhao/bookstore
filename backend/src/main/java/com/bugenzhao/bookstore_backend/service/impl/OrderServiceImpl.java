package com.bugenzhao.bookstore_backend.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import com.bugenzhao.bookstore_backend.dao.BookDao;
import com.bugenzhao.bookstore_backend.dao.OrderDao;
import com.bugenzhao.bookstore_backend.dao.UserDao;
import com.bugenzhao.bookstore_backend.entity.AuthedUser;
import com.bugenzhao.bookstore_backend.entity.OrdersSummary;
import com.bugenzhao.bookstore_backend.entity.db.Order;
import com.bugenzhao.bookstore_backend.entity.db.OrderItem;
import com.bugenzhao.bookstore_backend.entity.db.OrderStatus;
import com.bugenzhao.bookstore_backend.service.CartService;
import com.bugenzhao.bookstore_backend.service.OrderService;
import com.bugenzhao.bookstore_backend.utils.OrderUtils;
import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
@Transactional
public class OrderServiceImpl implements OrderService {
    final Logger logger = LogManager.getLogger();

    final CartService cartService;
    final UserDao userDao;
    final OrderDao orderDao;
    final BookDao bookDao;
    final AuthedUser auth;

    public OrderServiceImpl(CartService cartService, UserDao userDao, OrderDao orderDao, BookDao bookDao,
            HttpServletRequest request) {
        this.cartService = cartService;
        this.userDao = userDao;
        this.orderDao = orderDao;
        this.bookDao = bookDao;
        this.auth = SessionUtils.getAuth(request).get();
    }

    @Override
    public List<Order> findAll() {
        return orderDao.findByUser_Id(auth.getUserId());
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

        for (var orderItem : orderItems) {
            var book = orderItem.getBook();
            book.setInventory(book.getInventory() - orderItem.getQuantity());
            try {
                bookDao.saveAndFlush(book);
            } catch (ConstraintViolationException e) {
                logger.info("no enough inventory for " + orderItem + ": " + e);
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                return false;
            }
        }

        var user = userDao.getOne(auth.getUserId());
        var order = Order.builder().user(user).consignee(user.getUsername()).status(OrderStatus.submitted)
                .items(orderItems).totalPrice(cart.getTotal()).build();

        orderDao.save(order);
        return true;
    }

    @Override
    public OrdersSummary statOrdersBetween(Date from, Date to) {
        var orders = orderDao.findByUser_IdAndCreatedAtBetween(auth.getUserId(), from, to);
        var sales = OrderUtils.ordersToSales(orders);
        var total = sales.stream().map(b -> b.getBook().getPrice().multiply(BigDecimal.valueOf(b.getCount())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new OrdersSummary(sales, total);
    }
}
