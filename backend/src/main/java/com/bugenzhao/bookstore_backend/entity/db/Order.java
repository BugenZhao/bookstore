package com.bugenzhao.bookstore_backend.entity.db;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @NotNull
    private User user;

    @CreationTimestamp
    private Date createdAt;

    @NotNull
    private String consignee;

    @NotNull
    private OrderStatus status;

    @OneToMany(cascade = CascadeType.ALL)
    @NotNull
    private Set<OrderItem> items;

    @NotNull
    private BigDecimal totalPrice;
}
