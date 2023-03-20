import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import GradeIcon from "@mui/icons-material/Grade";
import { styled as mstyled } from "@mui/material/styles";

interface ReviewCardProps {
  review: Review;
}

interface Theme {
  themeId: number;
  title: string;
  imgUrl: string;
}

interface Review {
  reviewId: number;
  content: string;
  rating: number;
  activity: number;
  fear: number;
  difficulty: number;
  isSuccess: number;
  theme: Theme;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <ContentWrapper>
      <FirstColumn>
        <ThemeImage src={review.theme.imgUrl} alt="theme image" />
      </FirstColumn>
      <SecondColumn>
        <Title>{review.theme.title}</Title>
        <RatingWrapper>
          <RatingSection>
            <CustomGradeIcon />
            <div>{review.rating}</div>
          </RatingSection>
          <RatingSection>
            <RatingTitle>활동성</RatingTitle>
            <RatingScore>{review.activity}</RatingScore>
          </RatingSection>
          <RatingSection>
            <RatingTitle>공포도</RatingTitle>
            <RatingScore>{review.fear}</RatingScore>
          </RatingSection>
          <RatingSection>
            <RatingTitle>난이도</RatingTitle>
            <RatingScore>{review.difficulty}</RatingScore>
          </RatingSection>
        </RatingWrapper>
        <Content>{review.content}</Content>
        <RatingTitle>{review.isSuccess === 1 ? "성공" : "실패"}</RatingTitle>
      </SecondColumn>
      {/* <ThirdColumn></ThirdColumn> */}
      {/* <div>{review.reviewId}</div> */}
      {/* <div>{review.theme.themeId}</div> */}
    </ContentWrapper>
  );
}
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1.5rem;
  width: 46%;
  @media (max-height: 800px) {
    width: 45%;
  }
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
  width: 30%;
`;

const ThemeImage = styled.img`
  height: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
  word-break: break-all;
  text-overflow: ellipsis;
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Content = styled.div`
  word-break: break-all;
  text-overflow: ellipsis;
`;

const CustomGradeIcon = mstyled(GradeIcon)({
  color: "yellow",
});

// const ThirdColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   gap: 0.5rem;
//   width: 15%;
// `;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-height: 800px) {
    gap: 1rem;
  }
  gap: 1.5rem;
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const RatingTitle = styled.h3`
  /* position: relative; */
  /* bottom: 0.2rem; */
  /* right: 0.2rem; */
  font-size: 1.8rem;
  @media (max-height: 800px) {
    font-size: 1.3rem;
  }
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
`;

const RatingScore = styled.div`
  font-size: 1.8rem;
  @media (max-height: 800px) {
    font-size: 1.3rem;
  }
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.white};
  margin: 0;
`;

// const isCompleted = styled.div`
//   font-size: 1.8rem;
//   font-weight: ${theme.fontWeight.bold};
//   color: ${theme.colors.white};
//   margin: 0;
// `;
