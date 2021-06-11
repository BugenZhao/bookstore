package com.bugenzhao.bookstore_backend.dao.impl;

import java.util.List;
import java.util.Optional;

import com.bugenzhao.bookstore_backend.dao.AdminUserDao;
import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.repository.AdminUserRepository;

import org.springframework.stereotype.Repository;

@Repository
public class AdminUserDaoImpl implements AdminUserDao {
    final AdminUserRepository repo;

    public AdminUserDaoImpl(AdminUserRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<User> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public User saveAndFlush(User user) {
        return repo.saveAndFlush(user);
    }

}
