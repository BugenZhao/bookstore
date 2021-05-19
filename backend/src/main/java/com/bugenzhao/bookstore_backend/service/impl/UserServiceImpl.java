package com.bugenzhao.bookstore_backend.service.impl;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.entity.RegisterInfo;
import com.bugenzhao.bookstore_backend.entity.db.User;
import com.bugenzhao.bookstore_backend.repository.UserRepository;
import com.bugenzhao.bookstore_backend.service.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    Logger logger = LogManager.getLogger();
    UserRepository repo;

    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public Optional<User> checkLoginInfo(LoginInfo info) {
        return repo.findByUsernameAndPassword(info.getUsername(), info.getPassword());
    }

    @Override
    public Optional<User> register(RegisterInfo info) {
        if (repo.findByUsername(info.getUsername()).isPresent()) {
            logger.info("register with already-existing username");
            return Optional.empty();
        } else {
            var userToSave = User.builder().username(info.getUsername()).password(info.getPassword()).build();
            var user = repo.save(userToSave);
            return Optional.of(user);
        }
    }
}
