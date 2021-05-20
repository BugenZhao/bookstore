package com.bugenzhao.bookstore_backend.entity.db;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private Long id;

    @Column(unique = true)
    @NotNull
    private String username;

    @Column(unique = true)
    @Email
    @NotNull
    private String email;

    @Size(min = 4)
    @NotNull
    @JsonIgnore
    private String password;

    @Builder.Default
    @Enumerated
    @NotNull
    private UserType type = UserType.normal;

    @Builder.Default
    @NotNull
    private Boolean banned = false;
}
