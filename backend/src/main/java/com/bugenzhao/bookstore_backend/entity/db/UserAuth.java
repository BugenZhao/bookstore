package com.bugenzhao.bookstore_backend.entity.db;

import javax.persistence.*;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "user_auths")
public class UserAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    @Builder.Default
    @Enumerated
    private UserType type = UserType.normal;

    @Builder.Default
    private Boolean banned = false;
}
