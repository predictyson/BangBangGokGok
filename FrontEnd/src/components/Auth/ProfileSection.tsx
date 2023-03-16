import React from "react";
import styled from "styled-components";
import LeftPorfile from "./LeftProfile";
import RightProfile from "./RightProfile";

export default function ProfileSection(props: ProfileProps) {
  return (
    <>
      <ProfileBox>
        <LeftPorfile />
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