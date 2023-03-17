package com.ssafy.bbkk.api.service;

public interface UserService {

    boolean existsByEmail(String email) throws Exception;
}
