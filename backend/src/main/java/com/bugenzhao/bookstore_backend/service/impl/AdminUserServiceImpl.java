package com.bugenzhao.bookstore_backend.service.impl;

import javax.validation.ConstraintViolationException;

import com.bugenzhao.bookstore_backend.dao.AdminUserDao;
import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.service.AdminUserService;
import com.bugenzhao.bookstore_backend.utils.BzBeanUtils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
@Transactional
public class AdminUserServiceImpl implements AdminUserService {
    final Logger logger = LogManager.getLogger();
    final AdminUserDao userDao;

    public AdminUserServiceImpl(AdminUserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return userDao.findAll(pageable);
    }

    @Override
    public boolean patchById(long userId, User patch) {
        var user = userDao.findById(userId).get();
        BzBeanUtils.copyNonNullProperties(patch, user, "id", "password");
        try {
            userDao.saveAndFlush(user);
            return true;
        } catch (ConstraintViolationException e) {
            logger.info("invalid patch " + patch + ": " + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return false;
        }
    }
}
