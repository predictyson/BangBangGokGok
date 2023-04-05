import React from "react";
import styled from "styled-components";
import ResetPassword from "@components/Auth/forgotpassword/ResetPasswordSection";
import Header from "@components/common/Header";

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <Container>
        <ResetPassword />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
`;
