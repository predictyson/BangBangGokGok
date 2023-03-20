import React, { useState } from "react";
import Header from "@/components/common/Header";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import UserSection from "@components/group/UserListSection";
import ThemeRecSection from "@components/group/ThemeRecSection";
import Toast, { showToast } from "@/components/common/Toast";

export default function GroupSetPage() {
  const [userList, setUserList] = useState<GroupSetUer[]>([]);

  const handleDeleteUser = (nickname: string) => {
    setUserList((prev) => {
      return prev.filter((user) => user.nickname !== nickname);
    });
  };

  const handleAddUser = (newUser: GroupSetUer) => {
    if (userList.includes(newUser)) {
      handleToastClick("error", "이미 추가된 유저입니다.");
      return;
    }

    handleToastClick("success", "성공적으로 추가되었습니다.");
    setUserList((prev) => {
      return [...prev, newUser];
    });
  };

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  return (
    <>
      <Header />
      <RootContainer>
        <Container>
          <HeaderSection>
            <h1>G r o u p S e t &nbsp; M a k e r</h1>
            <p>
              그룹 유저들을 추가하면, 모두가 공통으로 방문하지 않은 맞춤 추천
              테마가 제공됩니다! (최대 6명)
            </p>
          </HeaderSection>
          <UserSection
            userList={userList}
            handleDeleteUser={handleDeleteUser}
            handleAddUser={handleAddUser}
          />
          <ThemeRecSection userList={userList} />
        </Container>
        <Toast />
      </RootContainer>
    </>
  );
}

const RootContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  width: 90%;
  height: 90%;
  margin: auto auto;
  padding: 3rem;
  padding-top: 1rem;
  border-radius: 1rem;
  background-color: ${theme.colors.container};
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: ${theme.colors.pink};
    font-size: 1.5rem;
  }
  h1 {
    font-size: 3.2rem;
    font-weight: ${theme.fontWeight.extraBold};
  }
`;
