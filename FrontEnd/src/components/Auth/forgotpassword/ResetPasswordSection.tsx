import { theme } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import Toast, { showToast } from "@/components/common/Toast";
import { useLocation } from "react-router-dom";
import { IUserInfo } from "types/auth";
import { requestChangePassword } from "@/api/auth";

export default function ResetPasswordSection() {
  const navigate = useNavigate();
  const email = useLocation().state.email;
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<string>("");
  const [showHelperText, setShowHelperText] = useState(false);

  const handlePasswordData = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    if (name === "password") setPassword(value);
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

  const sendPassword = async () => {
    if (!showHelperText && password !== "") {
      const userData: IUserInfo = {
        email: email,
        password: password,
      };
      try {
        const response = await requestChangePassword(userData);
        
        if (response.status === 200) {
          handleToastClick("success", "비밀번호가 변경되었습니다.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        handleToastClick("error", "비밀번호 변경 중 오류가 발생했습니다.");
        console.error(error);
      }
    } else {
      handleToastClick("error", "새 비밀번호를 확인해주세요.");
    }
  };
  

  return (
    <Container>
      <SubjectText>새 비밀번호 설정</SubjectText>
      <CustomTextField
        label="새 비밀번호"
        autoComplete="current-password"
        sx={{ width: 420 }}
        color="warning"
        type="password"
        focused
        value={password}
        placeholder="새 비밀번호를 입력해주세요."
        onChange={handlePasswordData}
        name="password"
      />
      <CustomTextField
        label="새 비밀번호 확인"
        autoComplete="current-password"
        sx={{ width: 420 }}
        color="warning"
        type="password"
        focused
        value={passwordValid}
        onChange={handlePasswordData}
        name="passwordValid"
        placeholder="새 비밀번호를 입력해주세요."
        helperText={showHelperText ? "비밀번호와 일치하지 않습니다." : ""}
      />
      <ValidCheckButton onClick={sendPassword}>변경하기</ValidCheckButton>
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
  height: 55%;
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
