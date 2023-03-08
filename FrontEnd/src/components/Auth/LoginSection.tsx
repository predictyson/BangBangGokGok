import React from "react";
import styled from "styled-components";
import Gost from "@/assets/Auth/Gost.png";

export default function LoginSection() {
  return (
    <Container>
      <img src={Gost} />
      <h1>LoginSection</h1>
    </Container>
  );
}

const Container = styled.div`
  width: 50rem;
  height: 80vh;
  border-radius: 0.5rem;
  margin: auto auto;
  background-color: white;
`;
