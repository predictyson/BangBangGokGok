import React from "react";
import LoginSection from "@components/Auth/login/LoginSection";
import styled from "styled-components";

export default function LoginPage() {
  return (
    <Container>
      <LoginSection />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
