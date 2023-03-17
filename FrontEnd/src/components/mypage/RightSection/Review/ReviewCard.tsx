import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import GradeIcon from "@mui/icons-material/Grade";
import { styled as mstyled } from "@mui/material/styles";

interface ReviewCardProps {
  review: Review;
}

interface Review {
  reviewId: number;
  content: string;
  rating: number;
  activity: number;
  fear: number;
  difficulty: number;
  isSuccess: number;
  theme: {
    themeId: number;
    title: string;
    imgUrl: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <ContentWrapper>
      <FirstColumn>
        <img src={review.theme.imgUrl} alt="theme image" />
        <Title>{review.theme.title}</Title>
      </FirstColumn>
      <SecondColumn>
        <Content>{review.content}</Content>
        <RatingWrapper>
          <CustomGradeIcon />
          <div>{review.rating}</div>
        </RatingWrapper>
      </SecondColumn>
      <ThirdColumn>
        <RatingTitle>활동성</RatingTitle>
        <RatingScore>{review.activity}</RatingScore>
        <RatingTitle>공포도</RatingTitle>
        <RatingScore>{review.fear}</RatingScore>
        <RatingTitle>난이도</RatingTitle>
        <RatingScore>{review.difficulty}</RatingScore>
        <RatingTitle>{review.isSuccess === 1 ? "성공" : "실패"}</RatingTitle>
      </ThirdColumn>
      {/* <div>{review.reviewId}</div> */}
      {/* <div>{review.theme.themeId}</div> */}
    </ContentWrapper>
  );
}
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  width: 47%;
  height: 19.5rem;
  border-radius: 1.5rem;
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.white};
  background-color: ${theme.colors.containerLight};
`;

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 25%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
  word-break: break-all;
  text-overflow: ellipsis;
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 60%;
`;

const Content = styled.div`
  word-break: break-all;
  text-overflow: ellipsis;
`;

const CustomGradeIcon = mstyled(GradeIcon)({
  color: "yellow",
});

const ThirdColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  width: 15%;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const RatingTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
`;

const RatingScore = styled.div`
  font-size: 1.3rem;
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.white};
  margin: 0;
`;

const isCompleted = styled.div`
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
`;
