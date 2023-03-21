import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { ProfileProps } from "types/auth";
import { handleAvatar } from "@/api/user";
import { theme } from "@/styles/theme";
import Grid from "@mui/material/Grid";
import Toast, { showToast } from "@/components/common/Toast";

export default function LeftPorfile(props: ProfileProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetAvatar = (idx: string) => {
    props.changeUserInfo("profileImageType", `Avatar${idx}`);
    handleToastClick("success", "아바타가 성공적으로 변경되었습니다.");
    handleClose();
  };

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  return (
    <LeftBox>
      <ProfileBox>
        <ProfileImg
          src={handleAvatar(props.userAdditionalInfo.profileImageType)}
        />
      </ProfileBox>
      <SelectButton onClick={handleOpen}>아바타 선택</SelectButton>
      <Modal open={open} onClose={handleClose}>
        <ModalBox>
          <h1>아바타 선택</h1>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(10), (_, idx) => (
              <AvatarBox
                key={idx}
                onClick={() => handleSetAvatar((idx + 1).toString())}
              >
                <AvatarImg src={handleAvatar(`Avatar${idx + 1}`)} />
              </AvatarBox>
            ))}
          </Grid>
        </ModalBox>
      </Modal>
      <Toast />
    </LeftBox>
  );
}

const AvatarBox = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    background-color: ${theme.colors.containerLight};
  }
`;

const ProfileBox = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

const AvatarImg = styled.img`
  width: 10rem;
`;

const LeftBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5rem 0;
`;

const ProfileImg = styled.img`
  width: 10rem;
`;

const SelectButton = styled.div`
  height: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 800;
  cursor: pointer;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100rem;
  height: 50rem;
  background-color: ${theme.colors.background};
  border-radius: 1rem;
  box-shadow: 24;
  color: white;
  padding: 2rem;

  h1 {
    color: white;
    font-size: 3rem;
    margin-top: 0;
  }
`;

{
  /* <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar1")} />
            </AvatarBox>
            <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar2")} />
            </AvatarBox>
            <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar3")} />
            </AvatarBox>
            <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar4")} />
            </AvatarBox>
            <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar5")} />
            </AvatarBox>
            <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar6")} />
            </AvatarBox>
            <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar7")} />
            </AvatarBox>
            <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar8")} />
            </AvatarBox>
            <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar9")} />
            </AvatarBox>
            <AvatarBox>
              <AvatarImg src={handleAvatar("Avatar10")} />
            </AvatarBox> */
}
