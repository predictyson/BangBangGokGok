import React, { useState } from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import Ghost from "@/assets/Auth/Gost.png";
import { theme } from "@/styles/theme";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Google from "@/assets/Auth/GoogleLogin.png";
import Kakao from "@/assets/Auth/KakaoLogin.png";
import { requestLogin } from "@/api/auth";
import { IUserInfo } from "types/auth";
import { useCookies } from "react-cookie";

const InitUser = {
  email: "",
  password: "",
};

export default function LoginSection() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserInfo>(InitUser);
  const [cookies, setCookie] = useCookies(["refresh", "access", "nickname"]);

  const handleInputValue = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as string;
    const value = target.value as string;

    setUser((cur) => ({
      ...cur,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const {
        data: {
          token: { refreshToken, accessToken },
          user: { nickname },
        },
      } = await requestLogin(user);
      setCookie("refresh", refreshToken);
      setCookie("access", accessToken);
      setCookie("nickname", nickname);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <LoginImg src={Ghost} />
      <SubjectText>BangBang GokGok</SubjectText>
      {/* <SubjectText>GokGok</SubjectText> */}
      <CustomTextField
        label="E-mail"
        autoComplete="current-password"
        sx={{ width: 300 }}
        color="warning"
        focused
        name="email"
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
        onChange={handleInputValue}
        name="password"
        focused
      />
      <LoginButton onClick={handleLogin}>Login</LoginButton>
      <TextBox>
        <NavText onClick={() => navigate("/findpassword")}>
          비밀번호를 잊으셨나요?
        </NavText>
        <NavText onClick={() => navigate("/signup")}>회원가입 하러가기</NavText>
      </TextBox>
      <TextBox>
        <a href="https://bbkk.store/api/oauth2/authorization/google">
          <SNSbtn src={Google} />
        </a>

        <a href="https://bbkk.store/api/oauth2/authorization/kakao">
          <SNSbtn src={Kakao} />
        </a>
      </TextBox>
    </Container>
  );
}

const SNSbtn = styled.img`
  width: 14.5rem;
  cursor: pointer;
`;

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
  height: 70%;
  border-radius: 0.5rem;
  background-color: ${theme.colors.container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const LoginImg = styled.img`
  height: 15rem;
  margin: 0 auto;
`;

const SubjectText = styled.div`
  text-align: center;
  font-size: 4rem;
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
