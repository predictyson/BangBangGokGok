import React, { useState } from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";

export default function SignUpSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
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
        console.log(password);
        console.log(value);
        setShowHelperText(true);
        setPasswordValid(value);
      } else {
        console.log(password);
        console.log(value);
        setShowHelperText(false);
        setPasswordValid(value);
      }
    }
  };

  const SendNextPage = () =>
    navigate("/additional", { state: { email: email, password: password } });

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
        <ValidCheckButton>중복확인</ValidCheckButton>
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
    </Container>
  );
}

const CustomTextField = mstyled(TextField)({
  width: "70%",
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
  width: 60rem;
  height: 45rem;
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
  width: 10rem;
  border-radius: 0.5rem;
  padding-top: 1.3rem;
  text-align: center;
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
