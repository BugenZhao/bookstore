package com.bugenzhao.bookstore_backend.dao.impl;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.dao.UserDao;
import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.repository.UserRepository;

import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {
    final UserRepository repo;

    public UserDaoImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }

    @Override
    public Optional<User> findByEmailAndPassword(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public Optional<User> findByUsernameAndPassword(String username, String password) {
        return repo.findByUsernameAndPassword(username, password);
    }

    @Override
    public User getOne(Long userId) {
        return repo.getOne(userId);
    }

    @Override
    public User save(User userToSave) {
        return repo.save(userToSave);
    }
}
