package com.bugenzhao.bookstore_backend.entity.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { UserValidator.class })
public @interface ValidUser {
    String message() default "the user should be valid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
