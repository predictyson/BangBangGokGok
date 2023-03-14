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

const LeftBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5rem 0;
`;

const RightBox = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5rem 0;
`;
