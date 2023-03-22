import React from "react";
import styled from "styled-components";
import ResetPassword from "@/components/Auth/forgotpassword/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <Container>
      <ResetPassword />
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
