import { theme } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Toast, { showToast } from "@/components/common/Toast";
import {
  requestSendEmail,
  requestCheckCode,
  emailValidCheck,
} from "@/api/auth";
import { useNavigate } from "react-router-dom";

export default function EmailSection() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [validCode, setValidCode] = useState<string>("");

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === "email") {
      setEmail(e.target.value);
    } else {
      setValidCode(e.target.value);
    }
  };

  const sendCode = async () => {
    if (email === "" || !emailValidCheck(email)) {
      handleToastClick("error", "올바른 형식의 이메일을 입력하세요.");
    } else {
      try {
        const {
          data: { isExisted },
        } = await requestSendEmail(email);
        if (isExisted) {
          handleToastClick("success", "5분간 유효한 코드가 전송되었습니다.");
        } else {
          handleToastClick("error", "존재하지않는 이메일 입니다.");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const checkCode = async () => {
    // TODO : API 다녀와서 200 res오면
    try {
      const {
        data: { isCheck },
      } = await requestCheckCode(email, validCode);
      if (isCheck) {
        setIsValid(true);
        handleToastClick("success", "이메일 인증 성공!");
      } else {
        handleToastClick("error", "인증코드를 확인해주세요.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <SubjectText>이메일 인증</SubjectText>
      <p>이메일 인증 후, 비밀번호 변경이 가능합니다.</p>
      <HegihtHalfBox>
        <InputBox>
          <CustomTextField
            label="이메일"
            autoComplete="current-password"
            sx={{ width: 300 }}
            color="warning"
            name="email"
            focused
            placeholder="example123@naver.com"
            onChange={handleValue}
          />
          <ValidCheckButton onClick={sendCode}>코드 전송</ValidCheckButton>
        </InputBox>
        <InputBox>
          <CustomTextField
            label="인증코드"
            autoComplete="current-password"
            sx={{ width: 300 }}
            name="code"
            color="warning"
            focused
            placeholder="이메일로 발송된 코드를 입력하세요."
            onChange={handleValue}
          />
          <ValidCheckButton onClick={checkCode}>코드 확인</ValidCheckButton>
        </InputBox>
      </HegihtHalfBox>
      {isValid ? (
        <ValidCheckButton
          onClick={() =>
            navigate("/resetpassword", {
              state: {
                email,
              },
            })
          }
        >
          다음 단계로
        </ValidCheckButton>
      ) : (
        <NotValidCheckButton
          onClick={() => handleToastClick("error", "이메일 인증을 완료하세요.")}
        >
          다음 단계로
        </NotValidCheckButton>
      )}
      <Toast />
    </Container>
  );
}

const CustomTextField = mstyled(TextField)({
  width: "70%",
  height: "10%",
  color: "white",
  input: {
    color: "white",
    fontSize: "1.2rem",
  },
});

const HegihtHalfBox = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Container = styled.div`
  width: 60rem;
  height: 40rem;
  border-radius: 1.5rem;
  padding: 2rem 0;
  background-color: ${theme.colors.container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  p {
    color: ${theme.colors.pink};
    font-size: 2rem;
  }
`;

const SubjectText = styled.div`
  margin: 0 auto;
  font-size: 3rem;
  font-weight: ${theme.fontWeight.extraBold};
`;

const InputBox = styled.div`
  width: 42rem;
  display: flex;
  justify-content: space-between;
`;

const ValidCheckButton = styled.div`
  width: 10rem;
  height: 3.2rem;
  border-radius: 0.5rem;
  padding-top: 1.3rem;
  text-align: center;
  font-size: 1.7rem;
  background-color: ${theme.colors.pink};
  cursor: pointer;
`;

const NotValidCheckButton = styled.div`
  width: 10rem;
  height: 3.2rem;
  border-radius: 0.5rem;
  padding-top: 1.3rem;
  text-align: center;
  font-size: 1.7rem;
  background-color: grey;
  color: darkgrey;
  cursor: pointer;
`;
