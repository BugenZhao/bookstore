package com.bugenzhao.bookstore_backend.entity.db;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.bugenzhao.bookstore_backend.utils.JsonViews;
import com.fasterxml.jackson.annotation.JsonView;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    @JsonView(JsonViews.Admin.class)
    private User user;

    @CreationTimestamp
    private Date createdAt;

    @NotNull
    private String consignee;

    @NotNull
    private OrderStatus status;

    @OneToMany(cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn
    @NotNull
    private Set<OrderItem> items;

    @NotNull
    private BigDecimal totalPrice;
}
