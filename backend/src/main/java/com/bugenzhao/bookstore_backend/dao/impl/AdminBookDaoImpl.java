package com.bugenzhao.bookstore_backend.dao.impl;

import java.util.Optional;

import com.bugenzhao.bookstore_backend.dao.AdminBookDao;
import com.bugenzhao.bookstore_backend.entity.db.Book;
import com.bugenzhao.bookstore_backend.repository.AdminBookRepository;

import org.springframework.stereotype.Repository;

@Repository
public class AdminBookDaoImpl implements AdminBookDao {
    final AdminBookRepository repo;

    public AdminBookDaoImpl(AdminBookRepository repo) {
        this.repo = repo;
    }

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Book save(Book book) {
        return repo.save(book);
    }

    @Override
    public Book saveAndFlush(Book book) {
        return repo.saveAndFlush(book);
    }
}
