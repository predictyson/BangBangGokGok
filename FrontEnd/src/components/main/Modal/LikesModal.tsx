import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface IProps {
  childOpen: boolean;
  handleClose: () => void;
}
export default function LikesModal({ childOpen, handleClose }: IProps) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Modal
        open={childOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Container onClick={handleClose}>
            <iframe src="https://embed.lottiefiles.com/animation/4837"></iframe>
            <h1>관심 목록에 추가하였습니다.</h1>
            <ButtonWrapper>
              <CustomButton className="post" onClick={() => handleClose()}>
                확인
              </CustomButton>
              <CustomButton
                className="mylist"
                onClick={() => navigate("/mypage/likes")}
              >
                내 관심목록 보기
              </CustomButton>
            </ButtonWrapper>
          </Container>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
const CustomButton = styled.div`
  border: solid 2px white;
  color: white;
  background-color: ${(props) =>
    props.className === "post" ? "#FF6161" : "#3E2133"};
  font-size: 1.6rem;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem 1.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  /* &:hover {
    color: ${(props) => (props.className === "post" ? "solid 2px white" : "")};
    background-color: ${(props) =>
    props.className === "post" ? "solid 2px white" : ""};
    border: ${(props) => (props.className === "post" ? "solid 2px white" : "")};
  } */
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  width: 65%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  iframe {
    border: none;
    pointer-events: none;
  }
  .MuiBox-root {
  }
  .css-79ws1d-MuiModal-root {
    display: none;
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  bgcolor: "#3E2133",
  borderRadius: 10,
  boxShadow: 24,
  padding: "3rem 3rem",
  color: "white",
  zIndex: -1,
};
