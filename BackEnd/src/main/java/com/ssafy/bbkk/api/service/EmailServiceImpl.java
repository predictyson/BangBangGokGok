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
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:email.properties")
public class EmailServiceImpl implements EmailService{

    @Value("${AdminMail.id}")
    private String id;

    private final JavaMailSender javaMailSender;
    private final ConfirmationTokenRepository confirmationTokenRepository;

    @Override
    public void sendMessage(String to) throws Exception {
        String ePw = createKey();
        MimeMessage message = createMessage(ePw, to);
        javaMailSender.send(message);
        ConfirmationToken confirmationToken = ConfirmationToken.createEmailConfirmationToken(to, ePw);
        confirmationTokenRepository.save(confirmationToken);
    }

    @Override
    public boolean checkEmailCode(String email, String code) throws Exception {
        boolean result = false;
        // 이메일과 코드을 통해 토큰을 조회
        Optional<ConfirmationToken> confirmationToken = confirmationTokenRepository.findByUserEmailAndCode(email, code);
        ConfirmationToken token = null;
        if(confirmationToken.isPresent()) { // 토큰이 존재하고
            token = confirmationToken.get();
            if(!token.isExpired() // 토큰을 사용하지 않았고
                    && LocalDateTime.now().isBefore(token.getExpirationDate())){ // 유효 기간이 지나지 않았다면
                token.useToken(); // 토큰을 사용했다고 변경하고
                result = true; // 결과값 true
            }
        }
        return result;
    }

    private MimeMessage createMessage(String ePw, String to)throws Exception{
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to); //보내는 대상
        message.setSubject("[방방곡곡] 비밀번호 찾기 안내 메일"); //제목

        String msgg="";
//        msgg+= "<div style='margin:20px;'>";
//        msgg+= "<p><strong>방방곡곡 비밀번호 찾기 안내 메일 </strong></p>";
//        msgg+= "<br>";
//        msgg+= "<p>안녕하세요. <p>";
//        msgg+= "<p>방방곡곡(bbkk.store) 서비스 입니다.<p>";
//        msgg+= "<br>";
//        msgg+= "<p>아래 코드를 복사해 입력해주세요.<p>";
//        msgg+= "<br>";
//        msgg+= "<p>비밀번호 찾기 코드 : <strong>" + ePw + "</strong></p> ";
//        msgg+= "<br>";
//        msgg+= "<p>감사합니다.<p>";
//        msgg+= "<br>";
//        msgg+= "</div>";

        msgg += "<!-- 회색 배경 -->";
        msgg += "<table";
        msgg += "  border='0'";
        msgg += "  cellpadding='0'";
        msgg += "  cellspacing='0'";
        msgg += "  width='100%'";
        msgg += "  bgcolor='#F4F5F7'";
        msgg += "  style='";
        msgg += "    padding: 20px 16px 82px;";
        msgg += "    color: #191919;";
        msgg += "    font-family: 'Noto Sans KR', sans-serif;";
        msgg += "  '";
        msgg += "  class='wrapper'";
        msgg += ">";
        msgg += "  <tbody style='display: block; max-width: 600px; margin: 0 auto'>";
        msgg += "    <tr width='100%' style='display: block'>";
        msgg += "      <td width='100%' style='display: block'>";
        msgg += "        <!-- 본문 -->";
        msgg += "        <table";
        msgg += "          width='100%'";
        msgg += "          border='0'";
        msgg += "          cellpadding='0'";
        msgg += "          cellspacing='0'";
        msgg += "          bgcolor='#FFFFFF'";
        msgg += "          style='";
        msgg += "            display: inline-block;";
        msgg += "            padding: 32px;";
        msgg += "            text-align: left;";
        msgg += "            border-top: 80px solid #ff5b79;";
        msgg += "            border-collapse: collapse;";
        msgg += "          '";
        msgg += "          class='container'";
        msgg += "        >";
        msgg += "          <tbody style='display: block'>";
        msgg += "            <!-- BIGPICTURE 로고 -->";
        msgg += "            <tr>";
        msgg += "              <td";
        msgg += "                style='padding-bottom: 32px; font-size: 20px; font-weight: bold'";
        msgg += "              >";
        msgg += "                <img";
        msgg += "                  width='70'";
        msgg += "                  src='https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/pumpkin.png'";
        msgg += "                />";
        msgg += "              </td>";
        msgg += "              <td";
        msgg += "                style='";
        msgg += "                  padding-left: 10px;";
        msgg += "                  padding-bottom: 32px;";
        msgg += "                  font-size: 20px;";
        msgg += "                  font-weight: bold;";
        msgg += "                '";
        msgg += "              >";
        msgg += "                방방곡곡 비밀번호 찾기 안내 메일";
        msgg += "              </td>";
        msgg += "            </tr>";
        msgg += "            <!-- 본문 제목 -->";
        msgg += "            <tr></tr>";
        msgg += "            <!-- 본문 내용 -->";
        msgg += "            <tr></tr>";
        msgg += "            <!-- 본문 컨텐츠 영역 -->";
        msgg += "            <tr width='100%' style='display: block; margin-bottom: 32px'>";
        msgg += "              <td width='100%' style='display: block'>";
        msgg += "                <table";
        msgg += "                  border='0'";
        msgg += "                  cellpadding='0'";
        msgg += "                  cellspacing='0'";
        msgg += "                  width='100%'";
        msgg += "                  bgcolor='#F8F9FA'";
        msgg += "                  style='padding: 40px 20px; border-radius: 4px'";
        msgg += "                  class='content'";
        msgg += "                >";
        msgg += "                  <tbody style='display: block'>";
        msgg += "                    <tr style='display: block'>";
        msgg += "                      <td";
        msgg += "                        style='";
        msgg += "                          display: block;";
        msgg += "                          padding-bottom: 16px;";
        msgg += "                          font-size: 16px;";
        msgg += "                          font-weight: bold;";
        msgg += "                        '";
        msgg += "                      >";
        msgg += "                        안녕하세요! 방방곡곡입니다.";
        msgg += "                      </td>";
        msgg += "                      <td>";
        msgg += "                        <p>아래 코드를 복사해 입력해주세요.</p>";
        msgg += "                        <p>비밀번호 찾기 코드 : <b>123</b></p>";
        msgg += "                        <p>감사합니다.</p>";
        msgg += "                      </td>";
        msgg += "                    </tr>";
        msgg += "                  </tbody>";
        msgg += "                </table>";
        msgg += "              </td>";
        msgg += "            </tr>";
        msgg += "            <!-- 발신전용 & 저작권 -->";
        msgg += "            <tr></tr>";
        msgg += "            <tr>";
        msgg += "              <td";
        msgg += "                style='";
        msgg += "                  padding-bottom: 24px;";
        msgg += "                  color: #a7a7a7;";
        msgg += "                  font-size: 12px;";
        msgg += "                  line-height: 20px;";
        msgg += "                '";
        msgg += "              >";
        msgg += "                © 2023 방방곡곡 SSAFY, Ltd. All Rights Reserved.";
        msgg += "              </td>";
        msgg += "            </tr>";
        msgg += "          </tbody>";
        msgg += "        </table>";
        msgg += "      </td>";
        msgg += "    </tr>";
        msgg += "  </tbody>";
        msgg += "</table>";
        msgg += "";

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
