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
        <TopWrapper>
          <Title>{review.theme.title}</Title>
          {review.isSuccess === 1 && <Badge className="success">성공</Badge>}
          {review.isSuccess === 0 && <Badge className="failure">실패</Badge>}
        </TopWrapper>

        <RatingWrapper>
          <RatingSection>
            {/* <CustomGradeIcon /> */}
            <RatingTitle>평점</RatingTitle>
            <RatingScore>{review.rating}</RatingScore>
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
        <ButtonWrapper>
          <UpdateButton>수정</UpdateButton>
          <DeleteButton>삭제</DeleteButton>
        </ButtonWrapper>
      </SecondColumn>
    </ContentWrapper>
  );
}
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 2.5rem;
  width: 100%;
  aspect-ratio: 100 / 30;
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

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
`;

const TopWrapper = styled.div`
  flex-basis: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* gap: 1rem; */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
  word-break: break-all;
  text-overflow: ellipsis;
`;

const RatingWrapper = styled.div`
  flex-basis: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-height: 800px) {
    gap: 1rem;
  }
  gap: 1.5rem;
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const RatingTitle = styled.h3`
  font-size: 2.5rem;
  @media (max-height: 800px) {
    font-size: 2rem;
  }
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
`;

const RatingScore = styled.div`
  font-size: 2.3rem;
  @media (max-height: 800px) {
    font-size: 1.8rem;
  }
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.white};
  margin: 0;
`;

const Content = styled.div`
  flex-basis: 60%;
  font-size: 2.3rem;
  @media (max-height: 800px) {
    font-size: 1.8rem;
  }
  word-break: break-all;
  text-overflow: ellipsis;
`;

// const CustomGradeIcon = mstyled(GradeIcon)({
//   color: "yellow",
// });

const ButtonWrapper = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const Badge = styled.div`
  font-size: 2.3rem;
  @media (max-height: 800px) {
    font-size: 1.8rem;
  }
  font-weight: ${theme.fontWeight.bold};
  margin: 0;
  color: ${(props) =>
    props.className === "success" ? theme.colors.white : theme.colors.white};
  background-color: ${(props) =>
    props.className === "success"
      ? theme.colors.success
      : theme.colors.failure};
  border-radius: 2rem;
  padding: 1.5rem 2.5rem;
`;

const UpdateButton = styled.div`
  font-size: 2.3rem;
  @media (max-height: 800px) {
    font-size: 1.8rem;
  }
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.pink};
  margin: 0;
  border: 2px solid ${theme.colors.pink};
  border-radius: 2rem;
  padding: 1.5rem 2.5rem;
  :hover {
    background-color: ${theme.colors.pink};
    color: ${theme.colors.white};
  }
  cursor: pointer;
`;

const DeleteButton = styled.div`
  font-size: 2.3rem;
  @media (max-height: 800px) {
    font-size: 1.8rem;
  }
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.pink};
  margin: 0;
  border: 2px solid ${theme.colors.pink};
  border-radius: 2rem;
  padding: 1.5rem 2.5rem;
  :hover {
    background-color: ${theme.colors.pink};
    color: ${theme.colors.white};
  }
  cursor: pointer;
`;
