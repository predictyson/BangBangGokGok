import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <Line />
      <Content>
        <img
          src="https://user-images.githubusercontent.com/55784772/228745312-d8d5e7a9-79ce-41a2-a89e-078b10799586.png"
          alt="logo"
          style={{ width: "5.5rem" }}
        />
        <MiddleL>
          <Desc className="left">
            <b>SSAFY 8기 A204</b>
          </Desc>
          <Desc className="left">
            정상기 김성수 손예지 우상빈 이상민 이지원{" "}
          </Desc>
          {/* <Desc className="left">
            COPYRIGHT ⓒ 2023 BBKK, All right reserved.
          </Desc> */}
        </MiddleL>
        <MiddleR>
          <Desc className="right">bangbanggokgokservice@gmail.com</Desc>
          <Desc className="right">
            서울특별시 강남구 테헤란로 212 멀티캠퍼스 역삼
          </Desc>
        </MiddleR>
      </Content>
      <CopyRight> COPYRIGHT ⓒ 2023 BBKK, All right reserved.</CopyRight>
    </Container>
  );
}

const Content = styled.div`
  width: 92%;
  display: flex;
  justify-content: space-between;
`;
const CopyRight = styled.div`
  width: 92%;
  margin-top: 1.2rem;
`;

const MiddleL = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 50%;
  margin-left: 1rem;
`;

const MiddleR = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* white-space: nowrap; */
  width: 50%;
  align-items: flex-end;
`;

const Container = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
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
