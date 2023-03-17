package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.db.entity.ConfirmationToken;
import com.ssafy.bbkk.db.repository.ConfirmationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:email.properties")
public class EmailServiceImpl implements EmailService{

    @Value("${email.id}")
    private String id;

    private final JavaMailSender javaMailSender;
    private final ConfirmationTokenRepository confirmationTokenRepository;

    @Override
    public String sendMessage(String to) throws Exception {
        String ePw = createKey();
        MimeMessage message = createMessage(ePw, to);
        javaMailSender.send(message);
        ConfirmationToken confirmationToken = ConfirmationToken.createEmailConfirmationToken(to, ePw);
        confirmationTokenRepository.save(confirmationToken);
        return ePw;
    }

    @Override
    public boolean checkEmailCode(String email, String code) throws Exception {
        boolean result = false;
        // 이메일과 코드을 통해 토큰을 조회
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByUserEmailAndCode(email, code).orElseThrow();
        if(!confirmationToken.isExpired() // 토큰을 사용하지 않았고
                && LocalDateTime.now().isBefore(confirmationToken.getExpirationDate())){ // 유효 기간이 지나지 않았다면
            confirmationToken.useToken(); // 토큰을 사용했다고 변경하고
            result = true; // 결과값 true
        }
        return result;
    }

    private MimeMessage createMessage(String ePw, String to)throws Exception{
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to); //보내는 대상
        message.setSubject("[방방곡곡] 비밀번호 찾기 안내 메일"); //제목

        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<p><strong>방방곡곡 비밀번호 찾기 안내 메일 </strong></p>";
        msgg+= "<br>";
        msgg+= "<p>안녕하세요. <p>";
        msgg+= "<p>방방곡곡(bbkk.store) 서비스 입니다.<p>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 복사해 입력해주세요.<p>";
        msgg+= "<br>";
        msgg+= "<p>비밀번호 찾기 코드 : <strong>" + ePw + "</strong></p> ";
        msgg+= "<br>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(id,"bbkk_service"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

}
