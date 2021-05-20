package com.bugenzhao.bookstore_backend.entity.db;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    @Email
    private String email;

    @Column(nullable = false)
    @Size(min = 4)
    private String password;

    @Builder.Default
    @Enumerated
    @Column(nullable = false)
    private UserType type = UserType.normal;

    @Builder.Default
    @Column(nullable = false)
    private Boolean banned = false;
}
