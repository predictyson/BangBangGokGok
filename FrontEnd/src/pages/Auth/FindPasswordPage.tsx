import React from "react";
import FPSection from "@components/Auth/forgotpassword/FPSection";
import styled from "styled-components";

export default function FindPasswordPage() {
  return (
    <Container>
      <FPSection />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
