import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import UserSection from "./UserSection";

export default function UserListSection({
  userList,
  handleDeleteUser,
}: {
  userList: GroupSetUer[];
  handleDeleteUser: (nickname: string) => void;
}) {
  return (
    <Container>
      {userList.map((user: GroupSetUer, idx: number) => (
        <UserSection
          user={user}
          key={idx}
          handleDeleteUser={handleDeleteUser}
        />
      ))}
      {userList.length < 6 && (
        <AddButtonBox>
          <AddButton>
            <p>+</p>
          </AddButton>
        </AddButtonBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 1rem;
`;

const AddButtonBox = styled.div`
  width: 18rem;
  margin-right: 1rem;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const AddButton = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50rem;
  background-color: ${theme.colors.containerLight};
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  p {
    font-weight: ${theme.fontWeight.extrabold};
    font-size: 8rem;
    margin: 0;
    color: #f3e0e0;
  }
`;
