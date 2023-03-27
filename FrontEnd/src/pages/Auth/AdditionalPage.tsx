import React, { useState, useEffect } from "react";
import GenreSection from "@components/Auth/signup/additional/GenreSection";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ProfileSection from "@components/Auth/signup/additional/ProfileSection";
import { IAdditionalInfo } from "types/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { requestAdditional } from "@/api/auth";
import Toast, { showToast } from "@/components/common/Toast";

const InitAdditionalInfo: IAdditionalInfo = {
  userId: -1,
  nickname: "",
  genreIds: [],
  regionBig: "",
  regionSmall: "",
  age: 0,
  gender: "",
  profileImageType: "Avatar1",
};

export default function AdditionalPage() {
  const navigate = useNavigate();
  const userId = useLocation().state.userId;
  // console.log(userId);
  const [userAdditionalInfo, setUserAdditionalInfo] =
    useState<IAdditionalInfo>(InitAdditionalInfo);
  const [chapter, setChapter] = useState<"genre" | "profile">("genre");

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  const handleChapter = async () => {
    if (chapter === "genre") setChapter("profile");
    else {
      try {
        const res = await requestAdditional(userAdditionalInfo);
        if (res.status === 200) {
          handleToastClick("success", "회원가입이 완료되었습니다.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } catch (err) {
        console.log(err);
      }
      requestAdditional(userAdditionalInfo);
      navigate("/login");
    }
  };

  const changeUserInfo = (key: string, value: string | number | number[]) => {
    setUserAdditionalInfo((cur) => ({
      ...cur,
      [key]: value,
    }));
  };

  useEffect(() => {
    // 넘어오면서 회원가입 페이지의 고유 유저 ID를 넘겨준다. (식별자)
    changeUserInfo("userId", userId);
  }, []);

  return (
    <Container1>
      <Container>
        <SubjectText>추가 정보 입력하기</SubjectText>

        <InnerContainer>
          {chapter === "genre" ? (
            <>
              <h2 className="desc">
                선호 장르를 한 개 이상 선택하시면, 방탈출 테마를 추천받으실 수
                있어요!
              </h2>
              <GenreSection
                userAdditionalInfo={userAdditionalInfo}
                changeUserInfo={changeUserInfo}
              />
            </>
          ) : (
            <>
              <h2 className="desc">
                추가 정보를 입력해주시면, 방탈출 테마를 추천받을 수 있어요!
              </h2>
              <ProfileSection
                userAdditionalInfo={userAdditionalInfo}
                changeUserInfo={changeUserInfo}
              />
            </>
          )}
        </InnerContainer>
        <NextButton onClick={handleChapter}>
          {chapter === "genre" ? "다음 단계로" : "회원 가입 완료"}
        </NextButton>
      </Container>
      <Toast />
    </Container1>
  );
}
const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 0.5rem;
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
  width: 90%;
  height: 70%;
  border-radius: 1.5rem;
  padding: 2rem;
  background-color: ${theme.colors.containerLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
