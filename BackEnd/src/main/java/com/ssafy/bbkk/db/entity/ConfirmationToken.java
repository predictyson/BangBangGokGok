package com.ssafy.bbkk.db.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="confirmation_token")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConfirmationToken extends BaseTimeEntity{

    private static final long EMAIL_TOKEN_EXPIRATION_TIME_VALUE = 5L;	//토큰 만료 시간

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(length = 36)
    private String id;
    @Column
    private LocalDateTime expirationDate; // 유효 시간
    @Column
    private boolean expired; // 이메일 코드 확인했는지 여부
    @Column
    private String userEmail; // 유저 이메일
    @Column
    private String code; // 전송한 이메일 코드

    public static ConfirmationToken createEmailConfirmationToken(String userEmail, String code){
        ConfirmationToken confirmationToken = new ConfirmationToken();
        confirmationToken.expirationDate = LocalDateTime.now().plusMinutes(EMAIL_TOKEN_EXPIRATION_TIME_VALUE); // 5분후 만료
        confirmationToken.userEmail = userEmail;
        confirmationToken.expired = false;
        confirmationToken.code = code;
        return confirmationToken;
    }

    public void useToken(){
        expired = true;
    }
}
