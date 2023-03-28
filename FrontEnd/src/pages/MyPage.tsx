import Header from "@components/common/Header";
import LeftNavBar from "@components/mypage/LeftSection/LeftNavBar";
import RightContent from "@components/mypage/RightSection/RightContent";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { UserProfile } from "types/mypage";
import { getUserProfile } from "@/api/profile";

const GENRE_INITIAL_VALUE: IGenreData[] = [
  {
    genreId: -1,
    category: "",
  },
];

const INITIAL_USER_PROFILE: UserProfile = {
  userId: -1,
  nickname: "",
  regionBig: "",
  regionSmall: "",
  age: -1,
  gender: "",
  profileImageType: "",
  genre: GENRE_INITIAL_VALUE,
};

export default function MyPage() {
  const [userProfile, setUserProfile] =
    useState<UserProfile>(INITIAL_USER_PROFILE);

  const fetchUser = useCallback(async (userId: number) => {
    const response = await getUserProfile(userId);
    if (response.data.isMe === false) {
      throw Promise.reject(
        `마이페이지에서 자신의 정보가 아닌 다른 회원의 정보를 조회할 수 없습니다. ${response.status}`
      );
    }
    return response.data.userInfo;
  }, []);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId"));
    const requestMyProfile = async () => {
      const fetchedData = await fetchUser(userId);
      setUserProfile(fetchedData);
    };
    try {
      requestMyProfile();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Header />
      <BackGround>
        <ContentWrapper>
          <LeftNavBar userProfile={userProfile} />
          <RightContent />
        </ContentWrapper>
      </BackGround>
    </>
  );
}

const BackGround = styled.div`
  height: 90vh;
  background-color: ${theme.colors.background};
`;

const ContentWrapper = styled.div`
  width: 90%;
  box-sizing: border-box;
  height: 95%;
  margin: 0 auto;
  padding: 3rem;
  @media (max-height: 800px) {
    padding: 2rem;
  }
  gap: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: flex-start;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;
