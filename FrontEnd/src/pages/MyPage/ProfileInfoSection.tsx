import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ProfileChart from "@components/mypage/RightSection/Profile/ProfileChart";
import { getUserProfile, getUserPreferences } from "@/api/profile";
import { UserProfile, UserPreference } from "types/mypage";
import DeleteModal from "@components/main/Modal/DeleteAccountModal";
const PROFILE_INFO_INIT_VALUE: UserProfile = {
  id: 0,
  nickname: "",
  regionBig: "",
  regionSmall: "",
  age: 0,
  gender: "",
  profileImageType: "",
  genres: [],
};

const PREFERENCES_INIT_VALUE: UserPreference[] = [
  {
    genre: "",
    count: 0,
  },
];

export default function ProfileInfoSection() {
  const [profileInfo, setProfileInfo] = useState<UserProfile>(
    PROFILE_INFO_INIT_VALUE
  );
  const [isFetched, setIsFetched] = useState(false);
  const [preferences, setPreferences] = useState<UserPreference[]>(
    PREFERENCES_INIT_VALUE
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem("userId");
      try {
        if (userId === null) {
          throw new Error("userId is null");
        }
        const [response1, response2] = await Promise.all([
          getUserProfile(Number(userId)),
          getUserPreferences(Number(userId)),
        ]);
        setProfileInfo(response1.data.userInfo as UserProfile);
        setPreferences(response2.data.preference as UserPreference[]);
        setIsFetched(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log("HANDLE CLOSE");
    setOpen(false);
  };
  return (
    <ProfileWrapper>
      <SectionTitle>
        <> 내 정보 </>{" "}
        <DeleteAccount onClick={() => handleOpen()}>
          <span>회원 탈퇴</span>
        </DeleteAccount>
      </SectionTitle>
      <SectionContentWrapper>
        <SectionFirstColumn>
          <ContentWrapper>
            <ContentTitle>닉네임</ContentTitle>
            <Content>{profileInfo.nickname}</Content>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>성별</ContentTitle>
            {!isFetched && <Content></Content>}
            {isFetched && (
              <Content>{profileInfo.gender === "M" ? "남자" : "여자"}</Content>
            )}
          </ContentWrapper>
        </SectionFirstColumn>
        <SectionSecondColumn>
          <ContentWrapper>
            <ContentTitle>선호 장르</ContentTitle>
            <Content>{profileInfo.genres.join(", ")}</Content>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>선호 지역</ContentTitle>
            {!isFetched && <Content></Content>}
            {isFetched && (
              <Content>
                {profileInfo.regionBig}, {profileInfo.regionSmall}
              </Content>
            )}
          </ContentWrapper>
        </SectionSecondColumn>
      </SectionContentWrapper>
      <SectionTitle>나의 장르 선호도</SectionTitle>
      {isFetched && <ProfileChart preferences={preferences} />}
      <DeleteModal deleteModalOpen={open} handleClose={handleClose} />
    </ProfileWrapper>
  );
}
const DeleteAccount = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${theme.colors.pink};
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const SectionTitle = styled.h1`
  font-size: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1536px) {
    font-size: 3rem;
  }
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
  font-size: 2.8rem;
  @media (max-width: 1536px) {
    font-size: 2.3rem;
  }
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0.5rem;
`;

const Content = styled.div`
  font-size: 2.3rem;
  @media (max-width: 1536px) {
    font-size: 1.8rem;
  }

  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.white};
`;
