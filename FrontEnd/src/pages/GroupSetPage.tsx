import React, { useState } from "react";
import Header from "@/components/common/Header";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import UserSection from "@components/group/UserListSection";
import ThemeRecSection from "@components/group/ThemeRecSection";

const userData: GroupSetUer[] = [
  // { profileImageType: 1, nickname: "정개미" },
  { profileImageType: 2, nickname: "이상해씨" },
  { profileImageType: 3, nickname: "쉬운하나" },
  { profileImageType: 4, nickname: "변덕쟁이" },
  { profileImageType: 5, nickname: "정상수" },
  { profileImageType: 6, nickname: "해피" },
];

export default function GroupSetPage() {
  const [userList, setUserList] = useState<GroupSetUer[]>(userData);

  const handleDeleteUser = (nickname: string) => {
    setUserList((prev) => {
      return prev.filter((user) => user.nickname !== nickname);
    });
  };

  return (
    <>
      <Header />
      <Container>
        <HeaderSection>
          <h1>G r o u p S e t &nbsp; M a k e r</h1>
          <p>
            그룹 유저들을 추가하면, 모두가 공통으로 방문하지 않은 맞춤 추천
            테마가 제공됩니다! (최대 6명)
          </p>
        </HeaderSection>
        <UserSection userList={userList} handleDeleteUser={handleDeleteUser} />
        <ThemeRecSection userList={userList} />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 95%;
  height: 60rem;
  margin: auto auto;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${theme.colors.container};
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    color: ${theme.colors.pink};
    font-size: 1.5rem;
  }
  h1 {
    font-size: 3.2rem;
    font-weight: ${theme.fontWeight.extraBold};
    margin: 0;
  }
`;
