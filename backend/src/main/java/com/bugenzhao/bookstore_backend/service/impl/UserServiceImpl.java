package com.bugenzhao.bookstore_backend.service.impl;

import java.util.Optional;

import javax.validation.ConstraintViolationException;

import com.bugenzhao.bookstore_backend.dao.UserDao;
import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.entity.RegisterInfo;
import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.entity.db.UserType;
import com.bugenzhao.bookstore_backend.service.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    Logger logger = LogManager.getLogger();
    UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public Optional<User> checkLoginInfo(LoginInfo info) {
        return userDao.findByUsernameAndPassword(info.getUsername(), info.getPassword())
                .or(() -> userDao.findByEmailAndPassword(info.getUsername(), info.getPassword()));
    }

    @Override
    public Optional<User> register(RegisterInfo info) {
        if (userDao.findByUsername(info.getUsername()).isPresent()
                || userDao.findByEmail(info.getEmail()).isPresent()) {
            logger.info("register with already-existing username or email");
            return Optional.empty();
        } else {
            var userToSave = User.builder().username(info.getUsername()).email(info.getEmail())
                    .password(info.getPassword()).type(UserType.normal).banned(false).build();
            try {
                var user = userDao.save(userToSave);
                return Optional.of(user);
            } catch (ConstraintViolationException e) {
                logger.info("register with constraint violation");
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                return Optional.empty();
            }
        }
    }
}
