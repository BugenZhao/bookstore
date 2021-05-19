package com.bugenzhao.bookstore_backend.entity.db;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;

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
    @JsonProperty("user_id")
    private Long userId;

    private String username;

    private String password;

    @Builder.Default
    @JsonProperty("user_type")
    private Integer userType = 1;

    @Builder.Default
    private Boolean banned = false;
}
