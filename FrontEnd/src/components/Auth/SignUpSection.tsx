import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";

export default function LoginSection() {
  const navigate = useNavigate();

  return (
    <Container>
      <SubjectText>회원가입</SubjectText>
      <EmailCheckBox>
        <TextField
          label="이메일"
          autoComplete="current-password"
          sx={{ width: 300, input: { color: "white", fontSize: "15" } }}
          color="warning"
          focused
        />
        <ValidCheckButton>중복확인</ValidCheckButton>
      </EmailCheckBox>
      <TextField
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        sx={{ width: 420, input: { color: "white", fontSize: "15" } }}
        color="warning"
        focused
      />
      <TextField
        label="비밀번호 확인"
        type="password"
        autoComplete="current-password"
        sx={{ width: 420, input: { color: "white", fontSize: "15" } }}
        color="warning"
        focused
      />
      <SignUpButton onClick={() => navigate("/additional")}>
        회원가입
      </SignUpButton>
    </Container>
  );
}

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
