package com.bugenzhao.bookstore_backend.utils;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;

public class SessionUtils {
    public static boolean checkAuth(HttpServletRequest request) {
        return getAuth(request).isPresent();
    }

    public static Optional<AuthedUser> getAuth(HttpServletRequest request) {
        var session = request.getSession(false);
        if (session == null) {
            return Optional.empty();
        }
        return Optional.ofNullable((AuthedUser) session.getAttribute(Constants.AUTHED_USER.name()));
    }

    public static void setAuth(HttpServletRequest request, AuthedUser user) {
        var session = request.getSession(true);
        session.setAttribute(Constants.AUTHED_USER.name(), user);
    }

    public static boolean removeAuth(HttpServletRequest request) {
        var session = request.getSession(false);
        if (session == null) {
            return false;
        }
        session.invalidate();
        return true;
    }
}
