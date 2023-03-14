import React from "react";
import styled from "styled-components";
import Ghost from "@/assets/Auth/Gost.png";

export default function LeftPorfile() {
  return (
    <LeftBox>
      <ProfileImg src={Ghost} />
      <SelectButton>캐릭터 선택</SelectButton>
    </LeftBox>
  );
}

const LeftBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5rem 0;
`;

const ProfileImg = styled.img`
  width: 20rem;
  height: 20rem;
  border-radius: 50rem;
`;

const SelectButton = styled.div`
  height: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 800;
  cursor: pointer;
`;
