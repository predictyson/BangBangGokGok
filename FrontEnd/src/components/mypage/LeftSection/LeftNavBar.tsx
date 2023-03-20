import React, { useState, useEffect } from "react";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Avatar1, Avatar2, Avatar3 } from "@/assets/user";

interface StringMapByNumber {
  [key: number]: string;
}

const imageSrcMap: StringMapByNumber = {
  1: Avatar1,
  2: Avatar2,
  3: Avatar3,
};

export default function LeftNavBar() {
  // API 연결 후 사용
  const [imageNumber, setImageNumber] = useState<number>(3); // 프로필 이미지 번호
  const [nickname, setNickname] = useState<string>("정개미"); // 닉네임
  const [title, setTitle] = useState<string>("방탈출 초보"); // 칭호

  useEffect(() => {
    // API 연결
    // const getUserInfo = async () => {
    //   const response = await axios.get("/api/user");
    //   const { data } = response;
    //   setImageNumber(data.imageNumber);
    //   setNickname(data.nickname);
    //   setTitle(data.title);
    // };
    // getUserInfo();
  }, []);

  const navigate = useNavigate();

  return (
    <Wrapper>
      <ProfileWrapper>
        <ProfileImage src={imageSrcMap[imageNumber]} alt="profile image" />
        <ProfileName>{nickname}</ProfileName>
        <ProfileTitle>{title}</ProfileTitle>
      </ProfileWrapper>
      <NavWrapper>
        <NavItem onClick={() => navigate("")}>Profile</NavItem>
        <NavItem onClick={() => navigate("reviews")}>Reviews</NavItem>
        <NavItem onClick={() => navigate("likes")}>Likes</NavItem>
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
  gap: 0.5rem;
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

const ProfileTitle = styled.h2`
  color: ${theme.colors.white};
  font-size: 2rem;
  text-align: center;
  font-weight: ${theme.fontWeight.bold};
  margin: 0;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  background-color: ${theme.colors.containerLight};
  /* margin: 1rem; */
  padding: 0.5rem;
  border-radius: 1.5rem;
`;

const NavItem = styled.div`
  color: ${theme.colors.white};
  font-size: 2.2rem;
  text-align: center;
  font-weight: ${theme.fontWeight.bold};
  padding: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 1.5rem;
  background-color: ${theme.colors.container};
`;
