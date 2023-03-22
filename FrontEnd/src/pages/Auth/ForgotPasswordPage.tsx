import React from "react";
import EmailSection from "@components/Auth/forgotpassword/EmailSection";
import styled from "styled-components";

export default function ForgotPasswordPage() {
  return (
    <Container>
      <EmailSection />
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
