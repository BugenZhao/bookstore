package com.bugenzhao.bookstore_backend.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bugenzhao.bookstore_backend.utils.SessionUtils;

import org.springframework.web.servlet.HandlerInterceptor;

public class AdminInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        var isAdmin = SessionUtils.getAuth(request).map((au) -> au.isAdmin()).orElse(false);
        if (!isAdmin) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
        return isAdmin;
    }
}
