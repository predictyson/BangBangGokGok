import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar1, Avatar2, Avatar3 } from "@/assets/user";

export default function UserSection({
  user,
  handleDeleteUser,
}: {
  user: GroupSetUer;
  handleDeleteUser: (nickname: string) => void;
}) {
  const handleAvatar = (t: string) => {
    if (t === "Avatar1") return Avatar1;
    else if (t === "Avatar2") return Avatar2;
    else if (t === "Avatar3") return Avatar3;
  };

  return (
    <Container>
      <CloseIcon
        className="close"
        onClick={() => handleDeleteUser(user.nickname)}
      />
      <ProfileImg src={handleAvatar(user.profileImageType)} />
      <p>{user.nickname}</p>
    </Container>
  );
}

const Container = styled.div`
  width: 18rem;
  margin-right: 1rem;
  background-color: ${theme.colors.containerLight};
  border-radius: 1rem;
  padding: 1rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .close {
    font-size: 2rem;
    float: right;
    margin-left: auto;

    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.3);
    }
  }

  p {
    font-size: 2rem;
    color: ${theme.colors.pink};
  }
`;

const ProfileImg = styled.img`
  width: 13rem;
  height: 13rem;
  border-radius: 50rem;
  background-color: ${theme.colors.container};
`;