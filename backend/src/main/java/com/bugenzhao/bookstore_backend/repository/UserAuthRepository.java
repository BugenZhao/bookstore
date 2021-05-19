package com.bugenzhao.bookstore_backend.repository;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.UserAuth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {
    Optional<UserAuth> findByUsername(String username);

    Optional<UserAuth> findByUsernameAndPassword(String username, String password);
}
