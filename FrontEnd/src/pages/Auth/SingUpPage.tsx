import React from "react";
import SignUpSection from "@components/Auth/signup/SignUpSection";
import styled from "styled-components";
import Header from "@components/common/Header";

export default function SignUpPage() {
  return (
    <>
      <Header />
      <Container>
        <SignUpSection />
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
