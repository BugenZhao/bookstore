package com.bugenzhao.bookstore_backend.service.impl;

import java.util.Optional;

import javax.validation.ConstraintViolationException;

import com.bugenzhao.bookstore_backend.dao.AdminBookDao;
import com.bugenzhao.bookstore_backend.entity.db.Book;
import com.bugenzhao.bookstore_backend.service.AdminBookService;
import com.bugenzhao.bookstore_backend.utils.BzBeanUtils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
@Transactional
public class AdminBookServiceImpl implements AdminBookService {
    final Logger logger = LogManager.getLogger();
    final AdminBookDao bookDao;

    public AdminBookServiceImpl(AdminBookDao bookDao) {
        this.bookDao = bookDao;
    }

    @Override
    public boolean patchById(long bookId, Book patch) {
        var book = bookDao.findById(bookId).get();
        BzBeanUtils.copyNonNullProperties(patch, book, "id");
        try {
            bookDao.saveAndFlush(book);
            return true;
        } catch (ConstraintViolationException e) {
            logger.info("invalid patch " + patch + ": " + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return false;
        }
    }

    @Override
    public Optional<Book> put(Book bookToSave) {
        try {
            var book = bookDao.save(bookToSave);
            return Optional.of(book);
        } catch (ConstraintViolationException e) {
            logger.info("put an invalid book: " + bookToSave);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return Optional.empty();
        }
    }

    @Override
    public void deleteById(long bookId) {
        bookDao.deleteById(bookId);
    }
}
