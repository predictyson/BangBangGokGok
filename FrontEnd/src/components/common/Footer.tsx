import { fontSize } from "@mui/system";
import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      {/* <Dummy className="name">BangBangGokGok</Dummy> */}
      <Line />
      <Dummy className="desc">
        <b>SSAFY 8기 A204</b>
      </Dummy>
      <Dummy className="desc">정상기 김성수 손예지 우상빈 이상민 이지원 </Dummy>
      <Dummy className="desc">
        © 2023 방방곡곡 SSAFY, Ltd. All Rights Reserved.
      </Dummy>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8rem;
  padding: 2rem 0;
`;

const Dummy = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 97%;
  font-size: ${(props) => (props.className === "desc" ? "1.2rem" : "3rem")};
  margin: ${(props) => (props.className === "desc" ? "0.3rem 0 " : "0")};
`;

const Line = styled.div`
  width: 97%;
  height: 0.1rem;
  background-color: grey;
  text-align: center;
  margin: 2rem 0;
`;
