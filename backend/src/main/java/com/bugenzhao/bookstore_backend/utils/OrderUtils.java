package com.bugenzhao.bookstore_backend.utils;

import java.util.List;
import java.util.stream.Collectors;

import com.bugenzhao.bookstore_backend.entity.BookWithCount;
import com.bugenzhao.bookstore_backend.entity.db.Order;

public class OrderUtils {
    public static List<BookWithCount> ordersToSales(List<Order> orders) {
        var sales = orders.stream().flatMap(o -> o.getItems().stream())
                .collect(Collectors.groupingBy(i -> i.getBook(), Collectors.summingLong(i -> i.getQuantity())))
                .entrySet().stream().map(e -> new BookWithCount(e.getKey(), e.getValue())).collect(Collectors.toList());
        sales.sort((l, r) -> -l.getCount().compareTo(r.getCount()));
        return sales;
    }
}
