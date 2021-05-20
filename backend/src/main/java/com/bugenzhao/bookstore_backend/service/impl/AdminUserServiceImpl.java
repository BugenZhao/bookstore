package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;

import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.repository.AdminUserRepository;
import com.bugenzhao.bookstore_backend.service.AdminUserService;
import com.bugenzhao.bookstore_backend.utils.BzBeanUtils;

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

    @Override
    public void patchById(long userId, User patch) {
        var user = userRepo.findById(userId).get();
        BzBeanUtils.copyNonNullProperties(patch, user, "id", "password");
        userRepo.save(user);
    }
}
