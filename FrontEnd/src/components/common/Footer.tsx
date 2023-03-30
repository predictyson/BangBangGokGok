import { fontSize } from "@mui/system";
import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <Line />
      <Content>
        <MiddleL>
          <Desc className="left">
            <b>SSAFY 8기 A204</b>
          </Desc>
          <Desc className="left">
            정상기 김성수 손예지 우상빈 이상민 이지원{" "}
          </Desc>
          <Desc className="left">
            COPYRIGHT ⓒ 2023 BBKK, All right reserved.
          </Desc>
        </MiddleL>
        <MiddleR>
          <Desc className="right">Email: bangbanggokgokservice@gmail.com</Desc>
          <Desc className="right">
            Address: 서울특별시 강남구 테헤란로 212 멀티캠퍼스 역삼 801호
          </Desc>
        </MiddleR>
      </Content>
    </Container>
  );
}

const Content = styled.div`
  width: 92%;
  display: flex;
  justify-content: space-between;
`;

const MiddleL = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 50%;
`;

const MiddleR = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* white-space: nowrap; */
  width: 50%;
`;

const Container = styled.div`
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
  padding: 2.5% 0;
`;

const Desc = styled.div`
  display: flex;
  width: 92%;
  font-size: 1.2rem;
  margin: 0.3rem 0;
  justify-content: ${(props) =>
    props.className === "left" ? "flex-start" : "flex-end"};
  letter-spacing: 4px;
`;

const Line = styled.div`
  width: 92%;
  height: 0.1rem;
  background-color: grey;
  text-align: center;
  margin: 3rem 0;
`;
