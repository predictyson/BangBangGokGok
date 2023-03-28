import React from "react";
import styled from "styled-components";
import LeftPorfile from "./LeftProfile";
import RightProfile from "./RightProfile";
import { ProfileProps } from "types/auth";

export default function ProfileSection(props: ProfileProps) {
  return (
    <>
      <ProfileBox>
        <LeftPorfile
          userAdditionalInfo={props.userAdditionalInfo}
          changeUserInfo={props.changeUserInfo}
          handleToastClick={props.handleToastClick}
        />
        <RightProfile
          userAdditionalInfo={props.userAdditionalInfo}
          changeUserInfo={props.changeUserInfo}
          handleToastClick={props.handleToastClick}
        />
      </ProfileBox>
    </>
  );
}

const ProfileBox = styled.div`
  width: 80rem;
  height: 100rem;
  padding: 1rem 2rem;
  display: flex;
`;
