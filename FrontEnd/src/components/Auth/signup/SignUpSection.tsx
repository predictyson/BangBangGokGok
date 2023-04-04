import React, { useState } from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import {
  emailValidCheck,
  passwordValidCheck,
  requestCheckCode,
  requestEmailCheck,
  requestJoinCheck,
  requestSignUp,
} from "@/api/auth";
import Toast, { showToast } from "@/components/common/Toast";
import { IUserInfo } from "types/auth";

export default function SignUpSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<string>("");
  const [validCode, setValidCode] = useState<string>("");
  const [showValidHelperText, setShowValidHelperText] = useState(false);
  const [showPasswordHelperText, setShowPasswordHelperText] = useState(false);

  const handleSignUpData = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    if (name === "email") setEmail(value);
    else if (name === "password") {
      if (passwordValidCheck(value)) setShowPasswordHelperText(false);
      else setShowPasswordHelperText(true);
      setPassword(value);
    } else if (name === "passwordValid") {
      if (password !== value) {
        setShowValidHelperText(true);
      } else {
        setShowValidHelperText(false);
      }
      setPasswordValid(value);
    } else if (name === "code") {
      setValidCode(value);
    }
  };

  const checkCode = async () => {
    // TODO : API 다녀와서 200 res오면
    try {
      const { data: isCheck } = await requestCheckCode(email, validCode);
      if (isCheck) {
        setIsEmail(true);
        handleToastClick("success", "이메일 인증 성공!");
      } else {
        handleToastClick("error", "인증코드를 확인해주세요.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  const emailCheck = async () => {
    // if (emailValidCheck(email)) {
    //   requestEmailCheck(email)
    //     .then((res) => {
    //       const data = res.data;
    //       if (!data.isDuplicated) {
    //         setIsEmail(true);
    //         handleToastClick("success", "사용가능한 이메일입니다.");
    //       } else handleToastClick("error", "이미 존재하는 이메일입니다.");
    //     })
    //     .catch((message) => {
    //       console.log(message);
    //     });
    // } else {
    //   handleToastClick("error", "올바른 형식의 이메일을 입력해주세요.");
    // }

    try {
      const {
        data: { isExisted },
      } = await requestJoinCheck(email);
      console.log("this" + isExisted);
      if (!isExisted) {
        handleToastClick("success", "해당 주소로 인증번호가 전송되었습니다.");
      } else handleToastClick("error", "이미 존재하는 이메일입니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const sendNextPage = async () => {
    if (isEmail) {
      const userData: IUserInfo = {
        email: email,
        password: password,
      };

      if (password === passwordValid) {
        try {
          const { data } = await requestSignUp(userData);
          const newUserId = data.userId;
          navigate("/additional", {
            state: { userId: newUserId },
            replace: true,
          });
        } catch (error) {
          console.log(error);
          handleToastClick("error", "회원가입에 실패하였습니다.");
        }
      } else {
        handleToastClick("error", "비밀번호가 일치하지 않습니다.");
      }
    } else {
      handleToastClick("error", "이메일 인증을 해주세요.");
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
        <ValidCheckButton onClick={emailCheck}>코드 전송</ValidCheckButton>
      </EmailCheckBox>
      <EmailCheckBox>
        <CustomTextField
          label="인증코드"
          autoComplete="current-password"
          sx={{ width: 300 }}
          name="code"
          color="warning"
          focused
          value={validCode}
          placeholder="이메일로 발송된 코드를 입력하세요."
          onChange={handleSignUpData}
        />
        <ValidCheckButton onClick={checkCode}>코드 확인</ValidCheckButton>
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
        helperText={
          showPasswordHelperText
            ? "비밀번호는 영문자, 숫자, 특수문자를 모두 구성하여 8~16자로 입력하세요."
            : ""
        }
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
        helperText={showValidHelperText ? "비밀번호와 일치하지 않습니다." : ""}
      />
      <SignUpButton onClick={sendNextPage}>회원가입</SignUpButton>
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
