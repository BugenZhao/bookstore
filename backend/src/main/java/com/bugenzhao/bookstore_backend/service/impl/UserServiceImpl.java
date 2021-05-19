package com.bugenzhao.bookstore_backend.service.impl;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.LoginInfo;
import com.bugenzhao.bookstore_backend.entity.RegisterInfo;
import com.bugenzhao.bookstore_backend.entity.db.UserAuth;
import com.bugenzhao.bookstore_backend.repository.UserAuthRepository;
import com.bugenzhao.bookstore_backend.service.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    Logger logger = LogManager.getLogger();
    UserAuthRepository repo;

    public UserServiceImpl(UserAuthRepository repo) {
        this.repo = repo;
    }

    @Override
    public Optional<UserAuth> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public Optional<UserAuth> checkLoginInfo(LoginInfo info) {
        return repo.findByUsernameAndPassword(info.getUsername(), info.getPassword());
    }

    @Override
    public Optional<UserAuth> register(RegisterInfo info) {
        if (repo.findByUsername(info.getUsername()).isPresent()) {
            logger.info("register with already-existing username");
            return Optional.empty();
        } else {
            var userToSave = UserAuth.builder().username(info.getUsername()).password(info.getPassword()).build();
            var user = repo.save(userToSave);
            return Optional.of(user);
        }
    }
}
