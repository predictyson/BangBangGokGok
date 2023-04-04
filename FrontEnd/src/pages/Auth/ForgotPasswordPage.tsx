import React from "react";
import EmailSection from "@components/Auth/forgotpassword/EmailSection";
import styled from "styled-components";
import Header from "@components/common/Header";

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <Container>
        <EmailSection />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;
