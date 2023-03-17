package com.ssafy.bbkk.api.service;

public interface EmailService {
    String sendMessage(String to) throws Exception;
    boolean checkEmailCode(String email, String code) throws Exception;
}
