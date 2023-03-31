import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Line from "@/assets/common/Line.png";

import { theme } from "@/styles/theme";
import ReviewCard from "@/components/mypage/RightSection/Review/ReviewCard";
import { UserReview } from "types/mypage";
import { getUserReviews } from "@/api/profile";
import { deleteReview, putReview } from "@/api/review";
import { Modal } from "@mui/material";
import { Rating, RatingProps } from "@mui/material";
import { IPostData } from "types/detail";
import { PutUserProfileParams } from "types/mypage";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled as mstyled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import StarIcon from "@mui/icons-material/Star";

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

export default function MyReviewsSection() {
  const [reviews, setReviews] = useState<UserReview[]>([]);

  // 리뷰 삭제
  const [currentSelectedReviewId, setCurrentSelectedReviewId] =
    useState<number>(-1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = (reviewId: number) => {
    setDeleteModalOpen(true);
    setCurrentSelectedReviewId(reviewId);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setCurrentSelectedReviewId(-1);
  };
  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
    } catch (error) {
      console.error(error);
    }
    handleCloseDeleteModal();
    setCurrentSelectedReviewId(-1);
  };

  // 리뷰 수정
  const [currentSelectedReviewData, setCurrentSelectedReviewData] =
    useState<UserReview>({} as UserReview);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleOpenUpdateModal = ({
    reviewId,
    content,
    userRating,
    userActivity,
    userFear,
    userDifficulty,
    createTime,
    isSuccess,
    previewThemeResponse,
  }: UserReview) => {
    setUpdateModalOpen(true);
    setCurrentSelectedReviewData({
      reviewId,
      content,
      userRating,
      userActivity,
      userFear,
      userDifficulty,
      createTime,
      isSuccess,
      previewThemeResponse,
    });
  };
  const handleCloseUpdateModal = () => {
    setCurrentSelectedReviewData({} as UserReview);
    setUpdateModalOpen(false);
  };

  const handleValueChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setCurrentSelectedReviewData({
        ...currentSelectedReviewData,
        isSuccess: newValue,
      });
    }
  };

  const handleRatingChange = useCallback(
    (e: React.SyntheticEvent<Element, Event>, value: number | null) => {
      console.log("HANDLE RATING CHANGE");
      const { name } = e.target as HTMLButtonElement;
      if (value !== null) {
        setCurrentSelectedReviewData((prevData) => ({
          ...prevData,
          [name]: value ?? 0,
        }));
      }
    },
    [setCurrentSelectedReviewData]
  );

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentSelectedReviewData({
      ...currentSelectedReviewData,
      content: event.target.value,
    });
  };

  const handleUpdateReview = async () => {
    const putReviewRequestBody: PutUserProfileParams = {
      reviewId: currentSelectedReviewData.reviewId,
      content: currentSelectedReviewData.content,
      userRating: currentSelectedReviewData.userRating,
      userActivity: currentSelectedReviewData.userActivity,
      userFear: currentSelectedReviewData.userFear,
      userDifficulty: currentSelectedReviewData.userDifficulty,
      isSuccess: currentSelectedReviewData.isSuccess,
    };
    const response = await putReview(putReviewRequestBody);
    console.log(response.data);
    // currentSelectedReviewData를 이용해서 reviews를 수정하기
    setReviews((prev) =>
      prev.map((review) => {
        if (review.reviewId === currentSelectedReviewData.reviewId) {
          return {
            ...review,
            content: currentSelectedReviewData.content,
            userRating: currentSelectedReviewData.userRating,
            userActivity: currentSelectedReviewData.userActivity,
            userFear: currentSelectedReviewData.userFear,
            userDifficulty: currentSelectedReviewData.userDifficulty,
            isSuccess: currentSelectedReviewData.isSuccess,
          };
        }
        return review;
      })
    );

    console.log("리뷰 수정 더 작성하세용", response);
    handleCloseUpdateModal();
  };

  useEffect(() => {
    const fetchUserReviews = async () => {
      const userId = Number(localStorage.getItem("userId"));
      const response = await getUserReviews(userId);
      setReviews(response.data.reviews as UserReview[]);
    };
    fetchUserReviews();
  }, []);

  return (
    <SectionWrapper>
      <SectionTitle>내 리뷰</SectionTitle>

      <SectionContentWrapper>
        {reviews.map((review) => (
          <ReviewCard
            key={review.reviewId}
            {...review}
            handleOpenUpdateModal={handleOpenUpdateModal}
            handleOpenDeleteModal={handleOpenDeleteModal}
          />
        ))}
      </SectionContentWrapper>

      <Modal open={updateModalOpen} onClose={handleCloseUpdateModal}>
        <Box sx={{ ...updateModalStyle }}>
          <Header>
            후기 작성하기
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
        {/* <Box sx={{ ...style }}>
          <Container>
            <h1>수정</h1>
            <ButtonWrapper>
              <CustomButton onClick={() => handleUpdateReview()}>
                수정
              </CustomButton>
            </ButtonWrapper>
          </Container>
        </Box> */}
      </Modal>

      {/* <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
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
      </Modal> */}
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const SectionTitle = styled.h1`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
`;

const SectionContentWrapper = styled.div`
  box-sizing: content-box;
  max-width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;
  border-radius: 1.5rem;
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

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  width: 70%;
`;

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

const updateModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "48%",
  height: "55%",
  bgcolor: "#33202F",
  borderRadius: 10,
  boxShadow: 24,
  padding: "4rem 6rem",
  color: "white",
};
