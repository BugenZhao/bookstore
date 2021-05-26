package com.bugenzhao.bookstore_backend.repository;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.User;

import org.springframework.data.repository.Repository;

public interface UserRepository extends Repository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameAndPassword(String username, String password);

    Optional<User> findByEmailAndPassword(String email, String password);

    User getOne(Long userId);

    User save(User userToSave);
}
