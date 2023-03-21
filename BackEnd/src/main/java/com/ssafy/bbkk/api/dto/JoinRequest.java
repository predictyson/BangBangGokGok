package com.ssafy.bbkk.api.dto;


import lombok.Getter;
import lombok.ToString;


@ToString
@Getter
public class JoinRequest {
    String email; // 이메일
    String password; // 비밀번호
}
