import React from "react";
import styled from "styled-components";
import LeftPorfile from "./LeftProfile";
import RightProfile from "./RightProfile";
import { ProfileProps } from "types/auction";

export default function ProfileSection(props: ProfileProps) {
  return (
    <>
      <ProfileBox>
        <LeftPorfile
          userInfo={props.userInfo}
          changeUserInfo={props.changeUserInfo}
        />
        <RightProfile
          userInfo={props.userInfo}
          changeUserInfo={props.changeUserInfo}
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
