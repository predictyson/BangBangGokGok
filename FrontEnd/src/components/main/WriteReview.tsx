/* eslint-disable @typescript-eslint/prefer-as-const */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import Line from "@/assets/common/Line.png";
import { theme } from "@/styles/theme";
import Rating from "@mui/material/Rating";
import ToggleButton from "@mui/material/ToggleButton";
import { styled as mstyled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
interface IProps {
  childOpen: boolean;
  handleClose: () => void;
  data: IDetailData;
}
export default function WriteReview({ childOpen, handleClose, data }: IProps) {
  const [rating, setRating] = useState<number | null>(0);
  const [difficulty, setDifficulty] = useState<number | null>(0);
  const [fear, setFear] = useState<number | null>(0);
  const [activity, setActivity] = useState<number | null>(0);
  const [isSuccess, setIsSuccess] = useState<string>("false");
  const [postdata, setPostdata] = useState<IPostData>(initData);
  const handleValueChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setIsSuccess(newValue);
    }
  };

  const handleSubmit = () => {
    // setPostdata(() => ({
    //   "themeId" : 1, // 테마 id
    //   "content":, // 리뷰 내용
    //   rating: 0.0, // 평점
    //   activity: 0.0, // 활동성
    //   fear: 0.0, // 공포도
    //   difficulty: 0.0, // 체감 난이도
    //   isSuccess: 0, // 성공 여부 (0:실패, 1:성공)
    //   record: 0.0, // 성공 기록 (분.초)
    // }));

    handleClose();
  };
  return (
    <React.Fragment>
      <Modal
        open={childOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Header>
            후기 작성하기
            <img
              src={Line}
              alt="line"
              style={{ width: "100%", margin: "1rem auto" }}
            />
          </Header>
          <InfoBox>
            테마명 :&nbsp; <div className="title">{data.title}</div>
          </InfoBox>
          <InfoBox>
            성공 여부 &nbsp;&nbsp;
            <ToggleButtonGroup
              value={isSuccess}
              exclusive
              onChange={handleValueChange}
              aria-label="Platform"
            >
              <CustomToggleButton value="success">성공</CustomToggleButton>
              <CustomToggleButton value="fail">실패</CustomToggleButton>
            </ToggleButtonGroup>
          </InfoBox>
          <ReviewBox>
            <RatingWrapper>
              <div className="ratingItem">
                <div className="title">후기 평점</div>
                <Rating
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      stroke: "white",
                    },
                    fontSize: "1.8rem",
                  }}
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </div>
              <div className="ratingItem">
                <div className="title">체감 난이도</div>
                <Rating
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      stroke: "white",
                    },
                    fontSize: "1.8rem",
                  }}
                  name="simple-controlled"
                  value={difficulty}
                  onChange={(event, newValue) => {
                    setDifficulty(newValue);
                  }}
                />
              </div>
              <div className="ratingItem">
                <div className="title">체감 공포도</div>
                <Rating
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      stroke: "white",
                    },
                    fontSize: "1.8rem",
                  }}
                  name="simple-controlled"
                  value={fear}
                  onChange={(event, newValue) => {
                    setFear(newValue);
                  }}
                />
              </div>

              <div className="ratingItem">
                <div className="title">체감 활동성</div>
                <Rating
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      stroke: "white",
                    },
                    fontSize: "1.8rem",
                  }}
                  name="simple-controlled"
                  value={activity}
                  onChange={(event, newValue) => {
                    setActivity(newValue);
                  }}
                />
              </div>
            </RatingWrapper>
            <form>
              <CustomText />
            </form>
          </ReviewBox>
          <ButtonWrapper>
            <CancelButton onClick={handleClose}>취소</CancelButton>

            <WriteButton onClick={handleSubmit}>등록</WriteButton>
          </ButtonWrapper>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
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

const CustomText = styled.textarea`
  font-size: 1.4rem;
  padding: 2rem;
  width: 95%;
  height: 10rem;
  border: solid 2px white;
  color: white;
  border-radius: 1rem;
  background-color: transparent;
  margin-top: 2rem;
  resize: none;
`;
const Header = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const InfoBox = styled.div`
  display: flex;
  font-size: 1.8rem;
  margin-top: 2rem;
  align-items: center;
`;
const RatingWrapper = styled.div`
  display: flex;
  font-size: 1.4rem;
  justify-content: space-between;
`;
const ReviewBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 1.6rem;
    margin-right: 1.5rem;
  }
  .ratingItem {
    font-size: 1.4rem;
    font-weight: ${theme.fontWeight.medium};
    color: white;
    display: flex;
    align-items: center;
  }
`;
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "48%",
  height: "55%",
  bgcolor: "#3E2133",
  borderRadius: 10,
  boxShadow: 24,
  padding: "4rem 6rem",
  color: "white",
};

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
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

const initData: IPostData = {
  themeId: 1, // 테마 id
  content: "", // 리뷰 내용
  rating: 0.0, // 평점
  activity: 0.0, // 활동성
  fear: 0.0, // 공포도
  difficulty: 0.0, // 체감 난이도
  isSuccess: 0, // 성공 여부 (0:실패, 1:성공)
  record: 0.0, // 성공 기록 (분.초)
};
