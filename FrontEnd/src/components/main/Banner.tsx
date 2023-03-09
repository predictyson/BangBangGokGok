import React from "react";
import styled from "styled-components";
import Gaonasi from "@/assets/common/Cuties.png";
import Button from "@/assets/common/DistortedButton.png";
import { theme } from "@/styles/theme";
export default function Banner() {
  return (
    <Container>
      <Cuties src={Gaonasi} alt="cutie-gaonasies" />
      <Message>
        <span className="impact">BangBangGokGok</span>을 가입하고
        <br />
        <span className="impact">추천 알고리즘</span>을 통한
        <span className="impact"> 맞춤 방탈출 테마</span>를 찾아보세요!
      </Message>
      <JoinButton src={Button} alt="distorted button" />
    </Container>
  );
}

const Container = styled.div`
  width: 79%;
  height: 21.3rem;
  margin: 2rem auto;
  padding: 0 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;

const Cuties = styled.img`
  width: 22%;
`;

const Message = styled.div`
  font-size: 2.4rem;
  font-family: Pretnedard;
  width: 62%;
  .impact {
    font-weight: bold;
    font-size: 2.8rem;
  }
`;

const JoinButton = styled.img`
  width: 16%;
  cursor: pointer;
`;
