import React, { useState } from "react";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Avatar1, Avatar2, Avatar3 } from "@/assets/user";
import { UserProfileProps } from "types/mypage";
// import { ProfileIcon, ReviewIcon, LikesIcon } from "@/assets/mypage.Profile";
import ProfileIcon from "@/assets/mypage/ProfileIcon.svg";
import ReviewIcon from "@/assets/mypage/ReviewIcon.svg";
import LikesIcon from "@/assets/mypage/LikesIcon.svg";

interface StringMapByNumber {
  [key: number]: string;
}

const imageSrcMap: StringMapByNumber = {
  1: Avatar1,
  2: Avatar2,
  3: Avatar3,
};

export default function LeftNavBar({ userProfile }: UserProfileProps) {
  // // API 연결 후 사용
  const [imageNumber, setImageNumber] = useState<number>(3); // 프로필 이미지 번호

  const navigate = useNavigate();

  return (
    <Wrapper>
      <ProfileWrapper>
        <ProfileImage
          // src={imageSrcMap[userProfile.profileImageType]}
          src={imageSrcMap[imageNumber]}
          alt="profile image"
        />
        <ProfileName>{userProfile.nickname}</ProfileName>
        {/* 칭호(?)는 아직 정해진 바가 없음! */}
        {/* <ProfileTitle>{userProfile.title}</ProfileTitle> */}
      </ProfileWrapper>
      <NavWrapper>
        <NavItem onClick={() => navigate("")}>
          <img src={ProfileIcon} />
          <span> Profile</span>
        </NavItem>
        <NavItem onClick={() => navigate("reviews")}>
          <img src={ReviewIcon} />
          <span> Reviews</span>
        </NavItem>
        <NavItem onClick={() => navigate("likes")}>
          <img src={LikesIcon} />
          <span> Likes</span>
        </NavItem>
      </NavWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  width: 23%;
  height: 100%;
  background-color: ${theme.colors.container};
  border-radius: 1.5rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: ${theme.colors.containerLight};
  /* margin: 1rem; */
  padding: 2rem 1rem;
  border-radius: 1.5rem;
`;

const ProfileImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 15rem;
  height: 15rem;
  border-radius: 1.5rem;
  text-align: center;
`;

const ProfileName = styled.h1`
  color: ${theme.colors.pink};
  font-size: 2.5rem;
  text-align: center;
  font-weight: ${theme.fontWeight.bold};
  margin: 0;
`;

// const ProfileTitle = styled.h2`
//   color: ${theme.colors.white};
//   font-size: 2rem;
//   text-align: center;
//   font-weight: ${theme.fontWeight.bold};
//   margin: 0;
// `;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  background-color: ${theme.colors.containerLight};
  padding: 0.5rem;
  border-radius: 1.5rem;
`;

const NavItem = styled.div`
  color: ${theme.colors.white};
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  padding: 2rem;
  cursor: pointer;
  border: none;
  border-radius: 1.5rem;
  background-color: ${theme.colors.container};
`;
