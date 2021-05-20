package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.repository.AdminUserRepository;
import com.bugenzhao.bookstore_backend.service.AdminUserService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminUserServiceImpl implements AdminUserService {
    AdminUserRepository userRepo;

    public AdminUserServiceImpl(AdminUserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }
}
