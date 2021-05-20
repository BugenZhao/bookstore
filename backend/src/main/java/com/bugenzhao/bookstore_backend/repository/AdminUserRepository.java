package com.bugenzhao.bookstore_backend.repository;

import com.bugenzhao.bookstore_backend.entity.db.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminUserRepository extends JpaRepository<User, Long> {

}
