import Header from "@components/common/Header";
import LeftNavBar from "@components/mypage/LeftSection/LeftNavBar";
import RightContent from "@components/mypage/RightSection/RightContent";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { UserProfile } from "types/mypage";

export default function MyPage() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: 0,
    nickname: "김성수",
    region: "서울",
    age: 30,
    gender: "남자",
    profileImageType: "",
    genre: [
      {
        genreId: 0,
        category: "공포",
      },
      {
        genreId: 1,
        category: "액션",
      },
    ],
  });

  // 회원 정보 조회 API
  // useEffect(() => {
  //   const email = localStorage.getItem("email"); // recoil로 변경
  //   const getUserProfile = async () => {
  //     const response = await axios({
  //       method: "GET",
  //       url: `http://localhost:8080/api/profile/${email}/info}`,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log(response); // { isMe: boolean, userInfo: UserProfile }
  //     if (response.data.isMe === false) {
  //       throw new Error(
  //         "마이페이지에서 자신의 정보가 아닌 다른 회원의 정보를 조회할 수 없습니다."
  //       );
  //     }
  //     setUserProfile(response.data.userInfo);
  //   };
  //   getUserProfile();
  // }, []);

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
  gap: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: flex-start;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;
