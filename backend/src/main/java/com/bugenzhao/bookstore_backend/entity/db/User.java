package com.bugenzhao.bookstore_backend.entity.db;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.bugenzhao.bookstore_backend.entity.validation.ValidUser;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "users")
@ValidUser
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

    @Enumerated
    @NotNull
    private UserType type;

    @NotNull
    private Boolean banned;

    public boolean isAdmin() {
        return type == UserType.admin;
    }
}
