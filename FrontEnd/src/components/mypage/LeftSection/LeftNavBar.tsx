import React from "react";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileIcon from "@/assets/mypage/ProfileIcon.svg";
import ReviewIcon from "@/assets/mypage/ReviewIcon.svg";
import LikesIcon from "@/assets/mypage/LikesIcon.svg";
import { handleAvatar } from "@/api/user";

export default function LeftNavBar() {
  const navigate = useNavigate();

  const getProfileImageTypeFromLocalStorage = () => {
    const profileImageType = localStorage.getItem("profileImageType");
    if (profileImageType === null) {
      throw new Error("profileImageType is null");
    }
    return profileImageType;
  };

  const getNicknameFromLocalStorage = () => {
    const nickname = localStorage.getItem("nickname");
    if (nickname === null) {
      throw new Error("nickname is null");
    }
    return nickname;
  };
  console.log(getProfileImageTypeFromLocalStorage());

  return (
    <Wrapper>
      <ProfileWrapper>
        <ProfileImageWrapper>
          <ProfileImage
            src={handleAvatar(getProfileImageTypeFromLocalStorage())}
            alt="profile image"
          />
        </ProfileImageWrapper>
        <ProfileName>{getNicknameFromLocalStorage()}</ProfileName>
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
  align-items: center;
  gap: 1.5rem;
  background-color: ${theme.colors.containerLight};
  padding: 2rem 1rem;
  border-radius: 1.5rem;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 25rem;
  background-color: ${theme.colors.container};
`;

const ProfileImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 12rem;
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

// const ProfileTitle = styled.h2` // 칭호에 쓸 컴포넌트
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
  @media (max-height: 800px) {
    padding: 1rem;
  }
  cursor: pointer;
  border: none;
  border-radius: 1.5rem;
  background-color: ${theme.colors.container};
`;
