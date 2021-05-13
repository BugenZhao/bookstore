package com.bugenzhao.bookstore_backend.config;

import java.util.List;

import com.bugenzhao.bookstore_backend.config.interceptor.UserAuthInterceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new UserAuthInterceptor()).addPathPatterns("/**")
                .excludePathPatterns(List.of("/users/login", "/users/register"));
    }
}
