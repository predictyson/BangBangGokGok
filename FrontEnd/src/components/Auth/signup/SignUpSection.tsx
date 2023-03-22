import React, { useState } from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import { requestEmailCheck, requestSignUp } from "@/api/auth";
import Toast, { showToast } from "@/components/common/Toast";
import { IUserInfo } from "types/auth";

export default function SignUpSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<string>("");
  const [showHelperText, setShowHelperText] = useState(false);

  const handleSignUpData = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "passwordValid") {
      if (password !== value) {
        setShowHelperText(true);
        setPasswordValid(value);
      } else {
        setShowHelperText(false);
        setPasswordValid(value);
      }
    }
  };

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  const EmailCheck = () => {
    console.log(email);
    requestEmailCheck(email)
      .then((res) => {
        const data = res.data;
        if (data) setIsEmail(true);
        else handleToastClick("error", "이미 존재하는 이메일입니다.");
      })
      .catch((message) => {
        console.log(message);
      });
  };

  const SendNextPage = () => {
    if (isEmail) {
      const userData: IUserInfo = {
        email: email,
        password: password,
      };
      let userId = "";

      requestSignUp(userData).then((res) => (userId = res.data.userId));
      navigate("/additional", { state: { userId: userId } });
    } else {
      handleToastClick("error", "이메일 중복확인을 해주세요.");
    }
  };

  return (
    <Container>
      <SubjectText>회원가입</SubjectText>
      <EmailCheckBox>
        <CustomTextField
          label="이메일"
          autoComplete="current-password"
          color="warning"
          focused
          value={email}
          name="email"
          placeholder="example123@naver.com"
          onChange={handleSignUpData}
        />
        <ValidCheckButton onClick={EmailCheck}>중복확인</ValidCheckButton>
      </EmailCheckBox>
      <CustomTextField
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        sx={{ width: 420 }}
        color="warning"
        focused
        value={password}
        name="password"
        onChange={handleSignUpData}
      />
      <CustomTextField
        label="비밀번호 확인"
        type="password"
        autoComplete="current-password"
        sx={{ width: 420 }}
        color="warning"
        focused
        value={passwordValid}
        name="passwordValid"
        onChange={handleSignUpData}
        helperText={showHelperText ? "비밀번호와 일치하지 않습니다." : ""}
      />
      <SignUpButton onClick={SendNextPage}>회원가입</SignUpButton>
      <Toast />
    </Container>
  );
}

const CustomTextField = mstyled(TextField)({
  width: "70%",
  height: "5rem",
  color: "white",
  input: {
    color: "white",
    fontSize: "1.2rem",
  },

  "& p": {
    color: "red",
    marginLeft: "5px",
  },
});

const Container = styled.div`
  width: 40%;
  height: 60%;
  border-radius: 0.5rem;
  margin: 12rem auto;
  background-color: ${theme.colors.container};
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const SubjectText = styled.div`
  margin: 0 auto;
  font-size: 3.5rem;
  font-weight: ${theme.fontWeight.extraBold};
`;

const EmailCheckBox = styled.div`
  width: 42rem;
  display: flex;
  justify-content: space-between;
`;

const ValidCheckButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  border-radius: 0.5rem;
  font-size: 1.7rem;
  background-color: ${theme.colors.pink};
  cursor: pointer;
`;

const SignUpButton = styled.div`
  width: 42rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 2rem;
  padding: 1rem 0;
  background-color: ${theme.colors.pink};
  cursor: pointer;
`;
