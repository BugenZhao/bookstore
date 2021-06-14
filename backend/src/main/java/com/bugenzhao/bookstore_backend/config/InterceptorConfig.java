package com.bugenzhao.bookstore_backend.config;

import java.util.List;

import com.bugenzhao.bookstore_backend.interceptor.AdminInterceptor;
import com.bugenzhao.bookstore_backend.interceptor.AuthInterceptor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Bean
    public AuthInterceptor authInterceptor() {
        return new AuthInterceptor();
    }

    @Bean
    public AdminInterceptor adminInterceptor() {
        return new AdminInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor()).addPathPatterns("/**")
                .excludePathPatterns(List.of("/users/login", "/users/register"));
        registry.addInterceptor(adminInterceptor()).addPathPatterns("/admin/**");
    }
}
