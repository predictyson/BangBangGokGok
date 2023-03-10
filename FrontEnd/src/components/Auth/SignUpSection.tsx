import React from "react";
import styled from "styled-components";
import Gost from "@/assets/Auth/Gost.png";
import { theme } from "@/styles/theme";
import TextField from "@mui/material/TextField";

export default function LoginSection() {
  return (
    <Container>
      <SubjectText>회원가입</SubjectText>
      <TextField
        label="E-mail"
        autoComplete="current-password"
        sx={{ width: 300, input: { color: "white", fontSize: "15" } }}
        color="warning"
        focused
      />
    </Container>
  );
}

const Container = styled.div`
  width: 80rem;
  height: 60rem;
  border-radius: 0.5rem;
  margin: 6rem auto;
  background-color: ${theme.colors.container};
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubjectText = styled.div`
  margin: 0 auto;
  font-size: 3.5rem;
  font-weight: ${theme.fontWeight.extraBold};
`;
