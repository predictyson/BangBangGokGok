import React, { useState } from "react";
import styled from "styled-components";
import LeftPorfile from "./LeftProfile";
import RightProfile from "./RightProfile";

const InitUserInfo = {
  profileImageType: "",
  nickname: "",
  genreId: 0,
  regionBig: "",
  age: 0,
  gender: "",
};

export default function ProfileSection() {
  const [userInfo, setUserInfo] = useState<IUserInfo>(InitUserInfo);

  return (
    <>
      <ProfileBox>
        <LeftBox>
          <LeftPorfile />
        </LeftBox>
        <RightBox>
          <RightProfile userInfo={userInfo} setUserInfo={setUserInfo} />
        </RightBox>
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
