import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ReviewCard from "@/components/mypage/RightSection/Review/ReviewCard";
import { UserReview } from "types/mypage";
import { getUserReviews } from "@/api/profile";

export default function MyReviewsSection() {
  const [reviews, setReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      const userId = Number(localStorage.getItem("userId"));
      const response = await getUserReviews(userId);
      console.log(response);
      setReviews(response.data.reviews as UserReview[]);
    };
    fetchUserReviews();
  }, []);

  return (
    <SectionWrapper>
      <SectionTitle>내 리뷰</SectionTitle>
      <SectionContentWrapper>
        {reviews.map((review) => (
          <ReviewCard key={review.reviewId} {...review} />
        ))}
      </SectionContentWrapper>
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
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;
  border-radius: 1.5rem;
`;
