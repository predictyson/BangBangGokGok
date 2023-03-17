import Header from "@components/common/Header";
import LeftNavBar from "@components/mypage/LeftSection/LeftNavBar";
import RightContent from "@components/mypage/RightSection/RightContent";
import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function MyPage() {
  return (
    <>
      <Header />
      <BackGround>
        <ContentWrapper>
          <LeftNavBar />
          <RightContent />
        </ContentWrapper>
      </BackGround>
    </>
  );
}

const BackGround = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.background};
`;

const ContentWrapper = styled.div`
  width: 90%;
  height: 58rem;
  margin: 2rem auto;
  padding: 3rem;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: flex-start;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;
