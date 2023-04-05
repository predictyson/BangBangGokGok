import React from "react";
import { Modal } from "@mui/material";
import { Rating, RatingProps } from "@mui/material";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { theme } from "@/styles/theme";
import Line from "@/assets/common/Line.png";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";
import ToggleButton from "@mui/material/ToggleButton";
import { styled as mstyled } from "@mui/material/styles";
import { UserReview } from "types/mypage";

interface RatingEvaluationStandardMap {
  name: keyof UserReview;
  emptyLabelText: string;
}

const ratings: RatingEvaluationStandardMap[] = [
  {
    name: "userRating",
    emptyLabelText: "후기 평점",
  },
  {
    name: "userDifficulty",
    emptyLabelText: "체감 난이도",
  },
  {
    name: "userFear",
    emptyLabelText: "체감 공포도",
  },
  {
    name: "userActivity",
    emptyLabelText: "체감 활동성",
  },
];

interface UpdateModalProps {
  updateModalOpen: boolean;
  handleCloseUpdateModal: () => void;
  currentSelectedReviewData: UserReview;
  handleValueChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: number | null
  ) => void;
  handleRatingChange: (
    e: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
  handleTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleUpdateReview: () => Promise<void>;
}

export default function UpdateModal({
  updateModalOpen,
  handleCloseUpdateModal,
  currentSelectedReviewData,
  handleValueChange,
  handleRatingChange,
  handleTextareaChange,
  handleUpdateReview,
}: UpdateModalProps) {
  return (
    <Modal open={updateModalOpen} onClose={handleCloseUpdateModal}>
      <Box sx={{ ...updateModalStyle }}>
        <Header>
          후기 수정하기
          <img
            src={Line}
            alt="line"
            style={{ width: "100%", margin: "1rem auto" }}
          />
        </Header>
        <InfoBox>
          <div className="info">
            테마명 :&nbsp;{" "}
            <div className="title">
              {currentSelectedReviewData?.previewThemeResponse?.title}
            </div>
          </div>
          <div className="info">
            성공 여부 &nbsp;&nbsp;
            <ToggleButtonGroup
              value={currentSelectedReviewData.isSuccess}
              exclusive
              onChange={handleValueChange}
            >
              <CustomToggleButton value={1}>성공</CustomToggleButton>
              <CustomToggleButton value={0}>실패</CustomToggleButton>
            </ToggleButtonGroup>
          </div>
        </InfoBox>

        <ReviewBox>
          <RatingWrapper>
            {ratings.map(({ emptyLabelText, name }) => (
              <div className="ratingItem" key={name}>
                <div className="rating-title">{emptyLabelText}</div>
                <Rating
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      stroke: "white",
                    },
                    "&.MuiRating-root:focus": {
                      outline: "none",
                    },
                    fontSize: "3rem",
                    marginLeft: "1rem",
                    boxSizing: "content-box",
                  }}
                  precision={0.5}
                  name={name}
                  value={currentSelectedReviewData[name] as number}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                  onChange={handleRatingChange}
                />
                <div />
              </div>
            ))}
          </RatingWrapper>
          <form>
            <CustomText
              value={currentSelectedReviewData.content}
              onChange={handleTextareaChange}
              maxLength={500}
            />
          </form>
        </ReviewBox>
        <ButtonWrapper>
          <CancelButton onClick={handleCloseUpdateModal}>취소</CancelButton>
          <WriteButton onClick={handleUpdateReview}>등록</WriteButton>
        </ButtonWrapper>
      </Box>
    </Modal>
  );
}

const Header = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;
const InfoBox = styled.div`
  display: flex;
  font-size: 1.8rem;
  margin-top: 2rem;
  align-items: center;
  .info {
    align-items: center;
    width: 50%;
    display: flex;
  }
`;

const CustomToggleButton = mstyled(ToggleButton)({
  padding: "0.5rem 1.5rem",
  fontSize: "1.5rem",
  borderRadius: "0.8rem",
  border: `solid 2px white`,
  fontFamily: "Pretendard",
  color: "white",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: `${theme.colors.pink}`,
    fontWeight: "bold",
  },
});

const ReviewBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 1.6rem;
    margin-right: 1.5rem;
  }
  .rating-title {
    width: 25%;
    font-size: 1.8rem;
  }
  .ratingItem {
    font-size: 1.6rem;
    height: 3.5rem;
    width: calc(50% - 1rem);
    font-weight: ${theme.fontWeight.medium};
    color: white;
    display: flex;
    align-items: center;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  font-size: 1.4rem;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CustomText = styled.textarea`
  font-size: 1.4rem;
  padding: 2rem;
  width: 95%;
  padding: 1rem;
  height: 10rem;
  border: solid 2px white;
  color: white;
  border-radius: 1rem;
  background-color: transparent;
  margin-top: 2rem;
  resize: none;
`;

const CancelButton = styled.div`
  border: solid 2px white;
  color: white;
  background-color: ${theme.colors.container};
  font-size: 1.6rem;
  margin-left: auto;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem 1.8rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.container};
    background-color: white;
    border: solid 2px ${theme.colors.container};
  }
`;
const WriteButton = styled.div`
  margin-left: 2rem;
  border: solid 2px ${theme.colors.container};
  color: ${theme.colors.container};
  background-color: white;
  font-size: 1.6rem;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem 1.8rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: ${theme.colors.container};
    border: solid 2px white;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const updateModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "48%",
  bgcolor: "#33202F",
  borderRadius: 10,
  boxShadow: 24,
  padding: "4rem 6rem",
  color: "white",
};
