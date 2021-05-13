package com.bugenzhao.bookstore_backend.utils;

import javax.servlet.http.HttpServletRequest;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;

public class SessionUtils {
    public static boolean checkAuth(HttpServletRequest request) {
        var session = request.getSession(false);
        if (session == null) {
            return false;
        }
        return (AuthedUser) session.getAttribute(Constants.AUTHED_USER.name()) != null;
    }

    public static AuthedUser getAuth(HttpServletRequest request) {
        var session = request.getSession(false);
        if (session == null) {
            return null;
        }
        return (AuthedUser) session.getAttribute(Constants.AUTHED_USER.name());
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
