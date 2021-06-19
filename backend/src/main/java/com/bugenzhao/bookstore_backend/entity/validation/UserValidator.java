package com.bugenzhao.bookstore_backend.entity.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.bugenzhao.bookstore_backend.entity.db.User;

public class UserValidator implements ConstraintValidator<ValidUser, User> {
    public UserValidator() {
    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext context) {
        if (user.isAdmin() && user.getBanned()) {
            return false;
        }

        return true;
    }
}
