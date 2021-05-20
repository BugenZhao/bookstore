package com.bugenzhao.bookstore_backend.service.impl;

import com.bugenzhao.bookstore_backend.entity.db.Book;
import com.bugenzhao.bookstore_backend.repository.AdminBookRepository;
import com.bugenzhao.bookstore_backend.service.AdminBookService;
import com.bugenzhao.bookstore_backend.utils.BzBeanUtils;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminBookServiceImpl implements AdminBookService {
    AdminBookRepository bookRepo;

    public AdminBookServiceImpl(AdminBookRepository bookRepo) {
        this.bookRepo = bookRepo;
    }

    @Override
    public void patchById(long bookId, Book patch) {
        var book = bookRepo.findById(bookId).get();
        BzBeanUtils.copyNonNullProperties(patch, book, "id");
        bookRepo.save(book);
    }
}
