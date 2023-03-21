import React, { useState } from "react";
import EmailSection from "@components/Auth/forgotpassword/EmailSection";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Toast, { showToast } from "@/components/common/Toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const handleValid = () => {
    setIsValid(true);
  };

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  return (
    <Container>
      <EmailSection handleValid={handleValid} />
      {isValid ? (
        <ValidCheckButton onClick={() => navigate("/resetpassword")}>
          다음 단계로
        </ValidCheckButton>
      ) : (
        <NotValidCheckButton
          onClick={() => handleToastClick("error", "이메일 인증을 완료하세요.")}
        >
          다음 단계로
        </NotValidCheckButton>
      )}
      <Toast />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
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
  margin-top: 3rem;
`;

const NotValidCheckButton = styled.div`
  width: 10rem;
  height: 3.2rem;
  border-radius: 0.5rem;
  padding-top: 1.3rem;
  text-align: center;
  font-size: 1.7rem;
  background-color: grey;
  color: darkgrey;
  cursor: pointer;
  margin-top: 3rem;
`;
