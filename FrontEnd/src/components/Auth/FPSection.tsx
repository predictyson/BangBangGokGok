import { theme } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

export default function FPSection() {
  const [isValid, setIsValid] = useState(true);

  return (
    <Container>
      <SubjectText>비밀번호 찾기</SubjectText>
      <HegihtHalfBox1>
        <InputBox>
          <TextField
            label="이메일"
            autoComplete="current-password"
            sx={{ width: 300, input: { color: "white" } }}
            color="warning"
            focused
          />
          <ValidCheckButton>코드 전송</ValidCheckButton>
        </InputBox>
        <InputBox>
          <TextField
            label="인증코드"
            autoComplete="current-password"
            sx={{ width: 300, input: { color: "white" } }}
            color="warning"
            focused
          />
          <ValidCheckButton>코드 확인</ValidCheckButton>
        </InputBox>
      </HegihtHalfBox1>
      <HegihtHalfBox2>
        {isValid ? (
          <>
            <SubjectText>새 비밀번호 설정</SubjectText>
            <TextField
              label="새 비밀번호"
              autoComplete="current-password"
              sx={{ width: 420, input: { color: "white" } }}
              color="warning"
              type="password"
              focused
            />
            <TextField
              label="새 비밀번호 확인"
              autoComplete="current-password"
              sx={{ width: 420, input: { color: "white" } }}
              color="warning"
              type="password"
              focused
            />
            <ValidCheckButton>변경하기</ValidCheckButton>
          </>
        ) : (
          <SubjectText>이메일 인증을 완료해주세요!</SubjectText>
        )}
      </HegihtHalfBox2>
    </Container>
  );
}

const HegihtHalfBox1 = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const HegihtHalfBox2 = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Container = styled.div`
  width: 80rem;
  height: 60rem;
  border-radius: 0.5rem;
  margin: 4rem auto;
  padding: 2rem 0;
  background-color: ${theme.colors.container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
