package com.bugenzhao.bookstore_backend.entity.db;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.persistence.*;

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
    private User user;

    @CreationTimestamp
    private Date createdAt;

    private String consignee;

    private OrderStatus status;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<OrderItem> items;

    private BigDecimal totalPrice;
}
