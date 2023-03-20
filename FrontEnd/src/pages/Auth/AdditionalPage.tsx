import React, { useState, useEffect } from "react";
import GenreSection from "@components/Auth/signup/additional/GenreSection";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ProfileSection from "@components/Auth/signup/additional/ProfileSection";
import { IUserInfo } from "types/auction";
import { useLocation } from "react-router-dom";

const InitUserInfo: IUserInfo = {
  email: "",
  password: "",
  nickname: "",
  genreId: [],
  regionBig: "",
  regionSmall: "",
  age: 0,
  gender: "",
  profileImageType: "Avatar1",
};

export default function AdditionalPage() {
  const userData = useLocation().state;
  const [userInfo, setUserInfo] = useState<IUserInfo>(InitUserInfo);
  const [chapter, setChapter] = useState<"genre" | "profile">("genre");

  const handleChapter = () => {
    if (chapter === "genre") setChapter("profile");
    else {
      console.log(userInfo);
    }
  };

  const changeUserInfo = (key: string, value: string | number | number[]) => {
    setUserInfo((cur) => ({
      ...cur,
      [key]: value,
    }));
  };

  useEffect(() => {
    changeUserInfo("email", userData.email);
    changeUserInfo("password", userData.password);
  }, []);

  return (
    <Container>
      <SubjectText>추가 정보 입력하기</SubjectText>

      <InnerContainer>
        {chapter === "genre" ? (
          <>
            <h2 className="desc">
              선호 장르를 한 개 이상 선택하시면, 방탈출 테마를 추천받으실 수
              있어요!
            </h2>
            <GenreSection userInfo={userInfo} changeUserInfo={changeUserInfo} />
          </>
        ) : (
          <>
            <h2 className="desc">
              추가 정보를 입력해주시면, 방탈출 테마를 추천받을 수 있어요!
            </h2>
            <ProfileSection
              userInfo={userInfo}
              changeUserInfo={changeUserInfo}
            />
          </>
        )}
      </InnerContainer>
      <NextButton onClick={handleChapter}>
        {chapter === "genre" ? "다음 단계로" : "회원 가입 완료"}
      </NextButton>
    </Container>
  );
}

const Container = styled.div`
  width: 120rem;
  height: 65rem;
  border-radius: 0.5rem;
  margin: 3rem auto;
  padding: rem 0;
  background-color: ${theme.colors.container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .desc {
    font-size: 20px;
    color: ${theme.colors.pink};
  }
`;

const InnerContainer = styled.div`
  width: 110rem;
  height: 44rem;
  border-radius: 1.5rem;
  padding: 1rem 2rem 2rem 2.5rem;
  background-color: ${theme.colors.containerLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-around; */
`;

const SubjectText = styled.div`
  font-size: 3.5rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: #f3e0e0;
`;

const NextButton = styled.div`
  width: 30rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  padding-top: 1rem;
  background-color: ${theme.colors.pink};
  cursor: pointer;
`;
