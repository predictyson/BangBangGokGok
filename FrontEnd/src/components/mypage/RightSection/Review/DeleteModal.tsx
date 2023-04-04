import React from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import styled from "styled-components";

interface DeleteModalProps {
  deleteModalOpen: boolean;
  handleCloseDeleteModal: () => void;
  currentSelectedReviewId: number;
  handleDeleteReview: (reviewId: number) => Promise<void>;
}

export default function DeleteModal({
  deleteModalOpen,
  handleCloseDeleteModal,
  currentSelectedReviewId,
  handleDeleteReview,
}: DeleteModalProps) {
  return (
    <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
      <Box sx={{ ...style }}>
        <Container>
          <h1>정말 삭제하시겠습니까?</h1>
          <ButtonWrapper>
            <CustomButton
              onClick={() => handleDeleteReview(currentSelectedReviewId)}
            >
              삭제
            </CustomButton>
          </ButtonWrapper>
        </Container>
      </Box>
    </Modal>
  );
}

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
  height: "25%",
  bgcolor: "#3E2133",
  borderRadius: 10,
  boxShadow: 24,
  padding: "2rem 3rem",
  color: "white",
  zIndex: -1,
};

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
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  width: 70%;
`;
