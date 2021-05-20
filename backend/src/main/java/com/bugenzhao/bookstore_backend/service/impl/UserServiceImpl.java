package com.bugenzhao.bookstore_backend.service.impl;

import java.util.Optional;

import javax.validation.ConstraintViolationException;

import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.entity.RegisterInfo;
import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.repository.UserRepository;
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
    UserRepository repo;

    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public Optional<User> checkLoginInfo(LoginInfo info) {
        return repo.findByUsernameAndPassword(info.getUsername(), info.getPassword())
                .or(() -> repo.findByEmailAndPassword(info.getUsername(), info.getPassword()));
    }

    @Override
    public Optional<User> register(RegisterInfo info) {
        if (repo.findByUsername(info.getUsername()).isPresent() || repo.findByEmail(info.getEmail()).isPresent()) {
            logger.info("register with already-existing username or email");
            return Optional.empty();
        } else {
            var userToSave = User.builder().username(info.getUsername()).email(info.getEmail())
                    .password(info.getPassword()).build();
            try {
                var user = repo.save(userToSave);
                return Optional.of(user);
            } catch (ConstraintViolationException e) {
                logger.info("register with constraint violation");
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                return Optional.empty();
            }
        }
    }
}
