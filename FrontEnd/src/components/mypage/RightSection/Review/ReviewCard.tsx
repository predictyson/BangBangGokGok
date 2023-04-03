import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { styled as mstyled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { UserReview } from "types/mypage";

interface RatingCategory {
  name: string;
  value: number;
}

interface ReviewCardProps extends UserReview {
  handleOpenUpdateModal: (currentSelectedReviewData: UserReview) => void;
  handleOpenDeleteModal: (reviewId: number) => void;
}

export default function ReviewCard({
  reviewId,
  content,
  userRating,
  userActivity,
  userFear,
  userDifficulty,
  createTime,
  isSuccess,
  previewThemeResponse,
  handleOpenUpdateModal,
  handleOpenDeleteModal,
}: ReviewCardProps) {
  const RatingItems: RatingCategory[] = [
    { name: "평점", value: userRating },
    { name: "활동성", value: userActivity },
    { name: "공포도", value: userFear },
    { name: "난이도", value: userDifficulty },
  ];

  return (
    <>
      <ContentWrapper>
        <FirstColumn>
          <ThemeImageWrapper>
            <ThemeImage src={previewThemeResponse.imgUrl} alt="theme image" />
          </ThemeImageWrapper>
        </FirstColumn>

        <SecondColumn>
          <TopWrapper>
            <Title>{previewThemeResponse.title}</Title>
            {isSuccess === 1 && <Badge className="success">성공</Badge>}
            {isSuccess === 0 && <Badge className="failure">실패</Badge>}
          </TopWrapper>

          <RatingWrapper>
            {RatingItems.map((item, idx) => (
              <RatingSection key={idx}>
                <CustomTypography>{item.name}</CustomTypography>
                <CustomRating
                  name="read-only"
                  value={item.value}
                  size="large"
                  precision={0.5}
                  readOnly
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55, color: "gray" }}
                      fontSize="inherit"
                    />
                  }
                />
              </RatingSection>
            ))}
          </RatingWrapper>

          <Content>{content}</Content>

          <ButtonWrapper>
            <UpdateButton
              onClick={() =>
                handleOpenUpdateModal({
                  reviewId,
                  content,
                  userRating,
                  userActivity,
                  userFear,
                  userDifficulty,
                  createTime,
                  isSuccess,
                  previewThemeResponse,
                })
              }
            >
              수정
            </UpdateButton>
            <DeleteButton onClick={() => handleOpenDeleteModal(reviewId)}>
              삭제
            </DeleteButton>
          </ButtonWrapper>
        </SecondColumn>
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  aspect-ratio: 100 / 40;
  border-radius: 1.5rem;
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.white};
  background-color: ${theme.colors.containerLight};
`;

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  gap: 1rem;
  flex-basis: 25%;
`;

const ThemeImageWrapper = styled.div`
  box-sizing: content-box;
  display: flex;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 1.5rem;
`;

const ThemeImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  flex-basis: 75%;
`;

const TopWrapper = styled.div`
  flex-basis: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
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
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-height: 800px) {
    gap: 0.7rem;
  }
  gap: 0.5rem;
`;

const RatingSection = styled.div`
  flex-basis: 49%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const CustomTypography = mstyled(Typography)({
  fontSize: "2.2rem",
  fontWeight: "bold",
  flexBasis: "25%",
});

const CustomRating = mstyled(Rating)({
  fontSize: "2.5rem",
  flexBasis: "75%",
});

const Content = styled.div`
  flex-basis: 60%;
  font-size: 2.3rem;
  @media (max-height: 800px) {
    font-size: 1.8rem;
  }
  color: rgba(255, 255, 255, 0.7);
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  /* flex-basis: 10%; */
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
  color: ${theme.colors.white};
  background-color: ${(props) =>
    props.className === "success"
      ? theme.colors.success
      : theme.colors.failure};
  border-radius: 2rem;
  padding: 1rem 2rem;
`;

const UpdateButton = styled.div`
  font-size: 2.3rem;
  @media (max-height: 800px) {
    font-size: 1.8rem;
  }
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.update};
  margin: 0;
  border: 2px solid ${theme.colors.update};
  border-radius: 2rem;
  padding: 1rem 2rem;
  :hover {
    background-color: ${theme.colors.update};
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
  padding: 1rem 2rem;
  :hover {
    background-color: ${theme.colors.pink};
    color: ${theme.colors.white};
  }
  cursor: pointer;
`;
