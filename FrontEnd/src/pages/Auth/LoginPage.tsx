import React from "react";
import LoginSection from "@components/Auth/login/LoginSection";
import styled from "styled-components";
import Header from "@components/common/Header";

export default function LoginPage() {
  
  return (
    <>
      <Header />
      <Container>
        <LoginSection />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;
