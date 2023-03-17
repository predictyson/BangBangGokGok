import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ReviewCard from "@/components/mypage/RightSection/Review/ReviewCard";

const reviews = [
  {
    reviewId: 1, // 리뷰 id
    content:
      "너무 재밌어서 정신이 나갈 것 같아요~1111111111111111111111111111111111111111111111111111111slkdjflksdjflksjdflksjl;kfjsk sldkjflskdjfklsdjfsd slkdjfslkfjsdlk", // 리뷰 내용
    rating: 5.0, // 평점
    activity: 4.0, // 활동성
    fear: 3.5, // 공포도
    difficulty: 3.5, // 체감 난이도
    //   createTime : localDateTime // 생성 날짜
    isSuccess: 1, // 성공 여부
    //   record : float // 남은 시간 기록
    theme: {
      themeId: 1, // 테마 id
      title: "바이러스 어쩌구1111111111111111", // 테마명
      imgUrl:
        "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png", // 테마 포스터 링크
      //   	 genres : string[] // 테마 장르 목록
    }, // 테마 정보
  },
  {
    reviewId: 2, // 리뷰 id
    content:
      "너무 재밌어서 정신이 나갈 것 같아요~2222222222222222222222222222222222222222", // 리뷰 내용
    rating: 5.0, // 평점
    activity: 4.0, // 활동성
    fear: 3.5, // 공포도
    difficulty: 3.5, // 체감 난이도
    //   createTime : localDateTime // 생성 날짜
    isSuccess: 1, // 성공 여부
    //   record : float // 남은 시간 기록
    theme: {
      themeId: 1, // 테마 id
      title: "바이러스 어쩌구2222222222222222", // 테마명
      imgUrl:
        "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png", // 테마 포스터 링크
      //   	 genres : string[] // 테마 장르 목록
    }, // 테마 정보
  },
  {
    reviewId: 3, // 리뷰 id
    content:
      "너무 재밌어서 정신이 나갈 것 같아요~333333333333333333333333333333333333333333333333333", // 리뷰 내용
    rating: 5.0, // 평점
    activity: 4.0, // 활동성
    fear: 3.5, // 공포도
    difficulty: 3.5, // 체감 난이도
    //   createTime : localDateTime // 생성 날짜
    isSuccess: 1, // 성공 여부
    //   record : float // 남은 시간 기록
    theme: {
      themeId: 1, // 테마 id
      title: "바이러스 어쩌구3333333333333333", // 테마명
      imgUrl:
        "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png", // 테마 포스터 링크
      //   	 genres : string[] // 테마 장르 목록
    }, // 테마 정보
  },
  {
    reviewId: 4, // 리뷰 id
    content:
      "너무 재밌어서 정신이 나갈 것 같아요~444444444444444444444444444444444444444444444444444", // 리뷰 내용
    rating: 5.0, // 평점
    activity: 4.0, // 활동성
    fear: 3.5, // 공포도
    difficulty: 3.5, // 체감 난이도
    //   createTime : localDateTime // 생성 날짜
    isSuccess: 1, // 성공 여부
    //   record : float // 남은 시간 기록
    theme: {
      themeId: 1, // 테마 id
      title: "바이러스 어쩌구4444444444444444444444", // 테마명
      imgUrl:
        "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png", // 테마 포스터 링크
      //   	 genres : string[] // 테마 장르 목록
    }, // 테마 정보
  },
  {
    reviewId: 5, // 리뷰 id
    content:
      "너무 재밌어서 정신이 나갈 것 같아요~555555555555555555555555555555555555555", // 리뷰 내용
    rating: 5.0, // 평점
    activity: 4.0, // 활동성
    fear: 3.5, // 공포도
    difficulty: 3.5, // 체감 난이도
    //   createTime : localDateTime // 생성 날짜
    isSuccess: 1, // 성공 여부
    //   record : float // 남은 시간 기록
    theme: {
      themeId: 1, // 테마 id
      title: "바이러스 어쩌구555555555", // 테마명
      imgUrl:
        "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png", // 테마 포스터 링크
      //   	 genres : string[] // 테마 장르 목록
    }, // 테마 정보
  },
  {
    reviewId: 6, // 리뷰 id
    content:
      "너무 재밌어서 정신이 나갈 것 같아요~666666666666666666666666666666666666666666666666666666666", // 리뷰 내용
    rating: 5.0, // 평점
    activity: 4.0, // 활동성
    fear: 3.5, // 공포도
    difficulty: 3.5, // 체감 난이도
    //   createTime : localDateTime // 생성 날짜
    isSuccess: 1, // 성공 여부
    //   record : float // 남은 시간 기록
    theme: {
      themeId: 1, // 테마 id
      title: "바이러스 어쩌구66666666666666666", // 테마명
      imgUrl:
        "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png", // 테마 포스터 링크
      //   	 genres : string[] // 테마 장르 목록
    }, // 테마 정보
  },
];

export default function MyReviewsSection() {
  return (
    <>
      <SectionTitle>MyReviewsSection</SectionTitle>
      <SectionContentWrapper>
        {reviews.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))}
      </SectionContentWrapper>
    </>
  );
}

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
  height: 47.2rem;
  border-radius: 1.5rem;
  margin: 1rem 0;
`;
