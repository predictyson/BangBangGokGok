import React from "react";
import styled from "styled-components";
import LoginSection from "@components/Auth/LoginSection";

export default function LoginPage() {
  return (
    <Container>
      <h1>Loginpage</h1>
      <LoginSection />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
