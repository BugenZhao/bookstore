package com.bugenzhao.bookstore_backend.service.impl;

import java.util.List;
import java.util.Optional;

import com.bugenzhao.bookstore_backend.entity.db.Book;
import com.bugenzhao.bookstore_backend.dao.BookDao;
import com.bugenzhao.bookstore_backend.service.BookService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    BookDao bookDao;

    public BookServiceImpl(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    @Override
    public Optional<Book> findById(long bookId) {
        return bookDao.findById(bookId);
    }

    @Override
    public List<Book> findAll() {
        return bookDao.findAll();
    }
}
