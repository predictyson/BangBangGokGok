import React from "react";
import styled from "styled-components";
export default function Footer() {
  return (
    <>
      <Line />
      <Container>
        <LogoBox>
          <img
            src="https://user-images.githubusercontent.com/55784772/228745312-d8d5e7a9-79ce-41a2-a89e-078b10799586.png"
            alt="logo"
          />
        </LogoBox>
        <MaterialBox>
          <Material className="title">SSAFY 8기 A204</Material>
          <Material> 정상기 김성수 손예지 우상빈 이상민 이지원</Material>
        </MaterialBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  padding: 2.5%;
  height: 10rem;
  border: solid 1px yellow;
`;
const LogoBox = styled.div`
  width: 20%;
  border: solid 1px white;
  display: flex;
`;
const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: grey;
  text-align: center;
  margin: 3rem 0;
`;

const MaterialBox = styled.div`
  width: 40%;
  border: solid 1px white;
  display: flex;
  font-size: 1.4rem;
  flex-direction: column;
  .title {
    font-size: 1.8rem;
  }
`;
const Material = styled.div`
  padding: 1rem;
`;
