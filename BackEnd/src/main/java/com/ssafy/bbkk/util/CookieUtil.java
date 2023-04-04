package com.ssafy.bbkk.util;

import com.ssafy.bbkk.api.controller.UserController;
import com.ssafy.bbkk.common.jwt.TokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.SerializationUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Optional;

public class CookieUtil {

    private static final Logger logger = LoggerFactory.getLogger(CookieUtil.class);

    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        logger.info("[getCookie] request : name={}",name);
        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName());
                if (name.equals(cookie.getName())) {
                    logger.info("[getCookie] response : value={}",cookie.getValue());
                    return Optional.of(cookie);
                }
            }
        }
        logger.info("[getCookie] response : none");
        return Optional.empty();
    }

    public static void addCookie(HttpServletRequest request, HttpServletResponse response, String name, String value) {
        logger.info("[addCookie] request : name={}",name);
        logger.info("[addCookie] request : value={}",value);

        Cookie[] cookies = request.getCookies();

        boolean isModify = false;
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    cookie.setValue(value);
                    cookie.setPath("/");
                    cookie.setMaxAge(60 * 60 * 24 * 1); // 1일
                    response.addCookie(cookie);
                    logger.info("[addCookie] modify : name={}",cookie.getName());
                    logger.info("[addCookie] modify : value={}",cookie.getValue());
                    logger.info("[addCookie] modify : maxAge={}",cookie.getMaxAge());
                    isModify = true;
                }
            }
        }

        if (isModify) return;

        Cookie cookie = new Cookie(name, value);
//        cookie.setDomain("bbkk.store");
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(60 * 60 * 24 * 1); // 1일

        response.addCookie(cookie);

        logger.info("[addCookie] add : name={}",cookie.getName());
        logger.info("[addCookie] add : value={}",cookie.getValue());
        logger.info("[addCookie] add : maxAge={}",cookie.getMaxAge());
    }

    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        logger.info("[deleteCookie] request : name={}",name);

        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                    logger.info("[deleteCookie] delete : cookie={}",cookie);
                }
            }
        }

        logger.info("[deleteCookie] response : none");
    }

    public static String serialize(Object obj) {
        return Base64.getUrlEncoder()
                .encodeToString(SerializationUtils.serialize(obj));
    }

    public static <T> T deserialize(Cookie cookie, Class<T> cls) {
        return cls.cast(
                SerializationUtils.deserialize(
                        Base64.getUrlDecoder().decode(cookie.getValue())
                )
        );
    }

}