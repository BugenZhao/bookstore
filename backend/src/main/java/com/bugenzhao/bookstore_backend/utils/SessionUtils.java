package com.bugenzhao.bookstore_backend.utils;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.bugenzhao.bookstore_backend.entity.AuthedUser;

import org.springframework.util.ConcurrentReferenceHashMap;

public class SessionUtils {
    static ConcurrentReferenceHashMap<Long, HttpSession> currentSession = new ConcurrentReferenceHashMap<>();

    public static boolean checkAuth(HttpServletRequest request) {
        return getAuth(request).isPresent();
    }

    public static Optional<AuthedUser> getAuth(HttpServletRequest request) {
        var session = request.getSession(false);
        if (session == null) {
            return Optional.empty();
        }
        var user = (AuthedUser) session.getAttribute(Constants.AUTHED_USER.name());
        if (user == null || currentSession.get(user.getUserId()) != session) {
            session.invalidate();
            return Optional.empty();
        }
        return Optional.of(user);
    }

    public static void setAuth(HttpServletRequest request, AuthedUser user) {
        var session = request.getSession(true);
        session.setAttribute(Constants.AUTHED_USER.name(), user);
        currentSession.put(user.getUserId(), session);
    }

    public static boolean removeAuth(HttpServletRequest request) {
        var session = request.getSession(false);
        if (session == null) {
            return false;
        }
        session.invalidate();
        return true;
    }

    public static void invalidateAuthForUser(Long userId) {
        currentSession.remove(userId);
    }
}
