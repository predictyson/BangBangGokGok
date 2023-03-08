import React from "react";
import styled from "styled-components";
import Gost from "@/assets/Auth/Gost.png";
import { theme } from "@/styles/theme";
import TextField from "@mui/material/TextField";

export default function LoginSection() {
  return (
    <Container>
      <LoginImg src={Gost} />
      <SubjectText>BangBang</SubjectText>
      <SubjectText>GokGok</SubjectText>
      <TextField
        label="E-mail"
        autoComplete="current-password"
        sx={{ width: 300 }}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        sx={{ width: 300 }}
        color="warning"
      />
      <LoginButton>Login</LoginButton>
      <h3>비밀번호를 잊으셨나요?</h3>
    </Container>
  );
}

const Container = styled.div`
  width: 50rem;
  height: 80vh;
  border-radius: 0.5rem;
  margin: auto auto;
  background-color: ${theme.colors.container};
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const LoginImg = styled.img`
  width: 15rem;
  height: 17.8rem;
  margin: 0 auto;
`;

const SubjectText = styled.div`
  margin: 0 auto;
  font-size: 4.6rem;
  font-weight: ${theme.fontWeight.extraBold};
`;

const LoginButton = styled.div`
  width: 30rem;
  height: 2.5rem;
  border-radius: 1rem;
  text-align: center;
  font-size: 1.6rem;
  padding-top: 0.5rem;
  background-color: ${theme.colors.pink};
`;
