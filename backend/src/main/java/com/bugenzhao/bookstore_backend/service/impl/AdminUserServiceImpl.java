package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;

import javax.validation.ConstraintViolationException;

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
    public boolean patchById(long userId, User patch) {
        var user = userRepo.findById(userId).get();
        BzBeanUtils.copyNonNullProperties(patch, user, "id", "password");
        try {
            userRepo.save(user);
            return true;
        } catch (ConstraintViolationException e) {
            // FIXME: failed to catch
            return false;
        }
    }
}
