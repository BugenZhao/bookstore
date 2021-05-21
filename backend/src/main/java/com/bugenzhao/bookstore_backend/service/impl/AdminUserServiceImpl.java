package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;

import javax.validation.ConstraintViolationException;

import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.repository.AdminUserRepository;
import com.bugenzhao.bookstore_backend.service.AdminUserService;
import com.bugenzhao.bookstore_backend.utils.BzBeanUtils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
@Transactional
public class AdminUserServiceImpl implements AdminUserService {
    final Logger logger = LogManager.getLogger();
    final AdminUserRepository userRepo;

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
            userRepo.saveAndFlush(user);
            return true;
        } catch (ConstraintViolationException e) {
            logger.info("invalid patch " + patch + ": " + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return false;
        }
    }
}
