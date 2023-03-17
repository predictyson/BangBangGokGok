import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function ProfileInfoSection() {
  return (
    <>
      <SectionTitle>Infomation</SectionTitle>
      <SectionContentWrapper>
        <ContentWrapper>
          <ContentTitle>닉네임</ContentTitle>
          <Content>정개미</Content>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>이메일</ContentTitle>
          <Content>example@example.com</Content>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>성별</ContentTitle>
          <Content>남자</Content>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>선호 장르</ContentTitle>
          <Content>공포, 뭐시기, 뭐시기</Content>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>선호 지역</ContentTitle>
          <Content>서울, 경기, 강원</Content>
        </ContentWrapper>
      </SectionContentWrapper>
      <SectionTitle>Chart</SectionTitle>
      <ChartWrapper>
        <div>차트1</div>
        <div>차트2</div>
      </ChartWrapper>
    </>
  );
}

const SectionTitle = styled.h1`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
`;

const SectionContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.5rem;
  height: 10.9rem;
  background-color: ${theme.colors.containerLight};
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  margin: 1rem 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;

const ContentTitle = styled.h2`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0.5rem;
`;

const Content = styled.div`
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.white};
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;
