import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ReviewCard from "@/components/mypage/RightSection/Review/ReviewCard";

export default function MyReviewsSection() {
  return (
    <SectionWrapper>
      <SectionTitle>MyReviewsSection</SectionTitle>
      <SectionContentWrapper>
        {reviews.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
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
      title: "여고괴담 : 과학실 살인사건(프로파일링 게임)", // 테마명
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
      title: "사람들은 그것을 행복이라 부르기로 했다", // 테마명
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
    isSuccess: 0, // 성공 여부
    //   record : float // 남은 시간 기록
    theme: {
      themeId: 1, // 테마 id
      title: "안녕하세요? 무엇을 도와드릴까요?", // 테마명
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
    isSuccess: 0, // 성공 여부
    //   record : float // 남은 시간 기록
    theme: {
      themeId: 1, // 테마 id
      title: "도시괴담 Part.2 The Abandoned Office", // 테마명
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
  {
    reviewId: 7, // 리뷰 id
    content: "너무 재밌어서 정신이 나갈 것 같아요~7777", // 리뷰 내용
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
