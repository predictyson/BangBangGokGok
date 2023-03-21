import React, { useState } from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import Gost from "@/assets/Auth/Gost.png";
import { theme } from "@/styles/theme";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function LoginSection() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleInputValue = (e: React.InputHTMLAttributes<unknown>) => {
    // setUser(e.formTarget);
  };

  return (
    <Container>
      <LoginImg src={Gost} />
      <SubjectText>BangBang</SubjectText>
      <SubjectText>GokGok</SubjectText>
      <CustomTextField
        label="E-mail"
        autoComplete="current-password"
        sx={{ width: 300 }}
        color="warning"
        focused
        onChange={handleInputValue}
      />
      <CustomTextField
        label="Password"
        type="password"
        autoComplete="current-password"
        sx={{
          width: 300,
        }}
        color="warning"
        focused
      />
      <LoginButton>Login</LoginButton>
      <TextBox>
        <NavText onClick={() => navigate("/findpassword")}>
          비밀번호를 잊으셨나요?
        </NavText>
        <NavText onClick={() => navigate("/signup")}>회원가입 하러가기</NavText>
      </TextBox>
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
});

const NavText = styled.div`
  cursor: pointer;
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;

const TextBox = styled.div`
  width: 30rem;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 30%;
  height: 80%;
  border-radius: 0.5rem;
  background-color: ${theme.colors.container};
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
  border-radius: 0.5rem;
  text-align: center;
  font-size: 1.6rem;
  padding-top: 0.5rem;
  background-color: ${theme.colors.pink};
  cursor: pointer;
`;
