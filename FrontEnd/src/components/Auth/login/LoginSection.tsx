import React, { useState } from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import Ghost from "@/assets/Auth/Gost.png";
import { theme } from "@/styles/theme";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Google from "@/assets/Auth/GoogleLogin.png";
import Kakao from "@/assets/Auth/KakaoLogin.png";
import { requestLogin, tempRequest } from "@/api/auth";
import { IUserInfo } from "types/auth";
import { showToast } from "@/components/common/Toast";

const InitUser = {
  email: "",
  password: "",
};

export default function LoginSection() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserInfo>(InitUser);

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  const handleInputValue = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as string;
    const value = target.value as string;

    setUser((cur) => ({
      ...cur,
      [name]: value,
    }));
  };

  /** 로그인 API
   * 로컬 로그인의 경우,
   * refreshToken은 cookie로
   * userId, nicname, accessToken은 localStorage로
   */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 동작 방지
    try {
      const {
        data: {
          accessToken,
          user: { nickname, userId, profileImageType, email },
        },
      } = await requestLogin(user);
      if (nickname === null) {
        navigate("/additional", { state: { userId: userId } });
      } else {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("userId", userId);
        localStorage.setItem("profileImageType", profileImageType);
        localStorage.setItem("email", email);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
      // TODO: 로그인 실패 TOAST 추가하자
      handleToastClick("error", "이메일, 비밀번호를 확인해주세요.");
    }
  };

  return (
    <Container>
      <LoginImg src={Ghost} onClick={tempRequest} />
      <SubjectText>BangBang GokGok</SubjectText>
      {/* <SubjectText>GokGok</SubjectText> */}
      <CustomForm onSubmit={handleLogin}>
        <CustomTextField
          autoComplete="current-password"
          color="warning"
          focused
          hiddenLabel
          name="email"
          onChange={handleInputValue}
          placeholder="example@google.com"
        />
        <CustomTextField
          placeholder="비밀번호를 입력하세요."
          type="password"
          autoComplete="current-password"
          color="warning"
          onChange={handleInputValue}
          name="password"
          focused
          hiddenLabel
        />
        <LoginButton type="submit" value="Login" />
      </CustomForm>
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

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 35%;
`;

const SNSbtn = styled.img`
  width: 17.5rem;
  cursor: pointer;
  @media screen and (max-width: 1600px) {
    width: 14.5rem;
  }
`;

const CustomTextField = mstyled(TextField)({
  width: "400px",
  color: "white",
  input: {
    color: "white",
    fontSize: "1.6rem",
  },

  "@media screen and (max-width: 1600px)": {
    width: "300px",
    color: "white",
    input: {
      color: "white",
      fontSize: "1.2rem",
    },
  },
});

const NavText = styled.div`
  cursor: pointer;
  display: block;
  font-size: 1.6rem;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;

  @media screen and (max-width: 1600px) {
    font-size: 1.17rem;
  }
`;

const TextBox = styled.div`
  width: 40rem;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1600px) {
    width: 30rem;
  }
`;

const Container = styled.div`
  width: 60rem;
  height: 65rem;
  padding: 4rem 0;
  border-radius: 1.5rem;
  background-color: ${theme.colors.container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width: 1600px) {
    width: 50rem;
    height: 55rem;
    padding: 2rem 0;
  }
`;

const LoginImg = styled.img`
  height: 20rem;
  margin: 0 auto;
  @media screen and (max-width: 1600px) {
    height: 15rem;
  }
`;

const SubjectText = styled.div`
  text-align: center;
  font-size: 5rem;
  font-weight: ${theme.fontWeight.extraBold};
  @media screen and (max-width: 1600px) {
    font-size: 4rem;
  }
`;

const LoginButton = styled.input`
  width: 40rem;
  font-size: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  padding: 1rem 0;
  color: white;
  background-color: ${theme.colors.pink};
  cursor: pointer;
  @media screen and (max-width: 1600px) {
    width: 30rem;
    font-size: 1.6rem;
  }
`;
