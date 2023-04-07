import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

import { handleAvatar } from "@/api/user";

export default function UserSection({
  user,
  handleDeleteUser,
}: {
  user: GroupSetUer;
  handleDeleteUser: (nickname: string) => void;
}) {
  const email = user.email;
  const atIndex = email.indexOf("@");
  const modifiedEmail = email.slice(0, 4) + "****" + email.slice(atIndex);

  return (
    <Container>
      <CloseIcon
        className="close"
        onClick={() => handleDeleteUser(user.nickname)}
      />
      <ProfileBox>
        <ProfileImg src={handleAvatar(user.profileImageType)} />
      </ProfileBox>
      <p>{user.nickname}</p>
      <h4>{modifiedEmail}</h4>
    </Container>
  );
}

const ProfileBox = styled.div`
  width: 15rem;
  border-radius: 50%;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background};
  @media screen and (max-width: 1600px) {
    width: 10rem;
    height: 10rem;
  }
`;

const Container = styled.div`
  width: 15%;
  margin: 0 0.5rem;
  background-color: ${theme.colors.containerLight};
  border-radius: 1rem;
  padding: 1rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .close {
    font-size: 3rem;
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

  h4 {
    font-size: 1.5rem;
    font-weight: ${theme.fontWeight.medium};
    margin: 0;
  }
`;

const ProfileImg = styled.img`
  width: 50%;
`;
