import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ProfileChart from "@components/mypage/RightSection/Profile/ProfileChart";
import { UserProfile } from "types/mypage";
import { useLocation } from "react-router-dom";

export default function ProfileInfoSection() {
  const location = useLocation();
  const {
    // age,
    gender,
    genres,
    // id,
    nickname,
    // profileImageType,
    regionBig,
    regionSmall,
  } = location.state as UserProfile;

  return (
    <ProfileWrapper>
      <SectionTitle>내 정보</SectionTitle>
      <SectionContentWrapper>
        <SectionFirstColumn>
          <ContentWrapper>
            <ContentTitle>닉네임</ContentTitle>
            <Content>{nickname}</Content>
          </ContentWrapper>
          {/* <ContentWrapper>
            <ContentTitle>이메일</ContentTitle>
            <Content>이메일은 안보내줘요!</Content>
          </ContentWrapper> */}
          <ContentWrapper>
            <ContentTitle>성별</ContentTitle>
            <Content>{gender === "M" ? "남자" : "여자"}</Content>
          </ContentWrapper>
        </SectionFirstColumn>
        <SectionSecondColumn>
          <ContentWrapper>
            <ContentTitle>선호 장르</ContentTitle>
            <Content>{genres.join(", ")}</Content>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>선호 지역</ContentTitle>
            <Content>
              {regionBig}, {regionSmall}
            </Content>
          </ContentWrapper>
        </SectionSecondColumn>
      </SectionContentWrapper>
      <SectionTitle>나의 장르 선호도</SectionTitle>
      <ProfileChart />
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

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
`;

const SectionFirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-basis: 50%;
`;

const SectionSecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-basis: 50%;
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
  flex-basis: 20%;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0.5rem;
`;

const Content = styled.div`
  flex-basis: 80%;
  font-size: 1.7rem;
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.white};
`;
