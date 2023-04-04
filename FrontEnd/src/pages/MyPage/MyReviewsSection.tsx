import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ReviewCard from "@/components/mypage/RightSection/Review/ReviewCard";
import { UserReview } from "types/mypage";
import { getUserReviews } from "@/api/profile";
import { deleteReview, putReview } from "@/api/review";
import { Rating, RatingProps } from "@mui/material";
import { IPostData } from "types/detail";
import { PutUserProfileParams } from "types/mypage";
import UpdateModal from "@components/mypage/RightSection/Review/UpdateModal";
import DeleteModal from "@components/mypage/RightSection/Review/DeleteModal";

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
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.reviewId !== reviewId)
    );
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
    // console.log(response.data);
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
        {reviews.length === 0 && <div>작성한 리뷰가 없습니다.</div>}
        {reviews.length !== 0 &&
          reviews.map((review) => (
            <ReviewCard
              key={review.reviewId}
              {...review}
              handleOpenUpdateModal={handleOpenUpdateModal}
              handleOpenDeleteModal={handleOpenDeleteModal}
            />
          ))}
      </SectionContentWrapper>
      <UpdateModal
        updateModalOpen={updateModalOpen}
        handleCloseUpdateModal={handleCloseUpdateModal}
        currentSelectedReviewData={currentSelectedReviewData}
        handleValueChange={handleValueChange}
        handleRatingChange={handleRatingChange}
        handleTextareaChange={handleTextareaChange}
        handleUpdateReview={handleUpdateReview}
      />
      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        handleCloseDeleteModal={handleCloseDeleteModal}
        currentSelectedReviewId={currentSelectedReviewId}
        handleDeleteReview={handleDeleteReview}
      />
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
