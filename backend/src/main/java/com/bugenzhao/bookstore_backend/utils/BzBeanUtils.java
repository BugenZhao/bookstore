package com.bugenzhao.bookstore_backend.utils;

import java.beans.FeatureDescriptor;
import java.util.stream.Stream;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.BeansException;

public class BzBeanUtils {
    public static void copyNonNullProperties(Object patch, Object target, String... ignoreProperties)
            throws BeansException {
        var ignored = Stream.of(getNullPropertyNames(patch), ignoreProperties).flatMap(Stream::of)
                .toArray(String[]::new);
        BeanUtils.copyProperties(patch, target, ignored);
    }

    private static String[] getNullPropertyNames(Object source) {
        final BeanWrapper wrappedSource = new BeanWrapperImpl(source);
        return Stream.of(wrappedSource.getPropertyDescriptors()).map(FeatureDescriptor::getName)
                .filter(propertyName -> wrappedSource.getPropertyValue(propertyName) == null).toArray(String[]::new);
    }
}
