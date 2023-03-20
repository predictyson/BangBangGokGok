import React from "react";
import SignUpSection from "@components/Auth/signup/SignUpSection";
import styled from "styled-components";

export default function SignUpPage() {
  return (
    <Container>
      <SignUpSection />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
