package com.ssafy.bbkk.api.service;

public interface EmailService {
    void sendMessage(String to, int type) throws Exception;
    boolean checkEmailCode(String email, String code) throws Exception;
}
