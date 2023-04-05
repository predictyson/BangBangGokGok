import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { getUserInterests } from "@/api/profile";
import { UserInterestTheme } from "types/mypage";
import Modal from "@components/main/Modal/Modal";
import { IDetailData, IReviewData } from "types/detail";
import { getDetail } from "@/api/theme";
import { getReviews } from "@/api/review";

const initData: IDetailData = {
  themeId: 1,
  regionBig: "서울", // 지역(대분류)
  regionSmall: "강남", // 지역(소분류)
  storeName: "코드케이 홍대점", // 매장명
  title: "미스테리 거울의 방", // 테마명
  genre: ["공포", "추리"], // 장르 목록
  difficulty: 3.2, // 난이도
  runningTime: 60, // 시간 (분단위)
  openDate: "2023.03.13", // 오픈일
  minPeople: 2, // 최소 인원
  maxPeople: 6, // 최대 인원
  imgUrl:
    "https://user-images.githubusercontent.com/55784772/224640336-ec8412c3-f81b-4472-b6a5-9e56254004a3.jpg", // 테마 포스터 링크
  pageUrl: "http://www.code-k.co.kr/", // 테마 예약페이지 링크
  synopsis: `"몇 년 전부터 조직에 잠입해 있던 언더커버로부터 대량의 마약 거래 정보가 들어왔다.
    지휘부에서는 나를 포함한 경찰 특공대를 이 마약 조직에 몇 달 전부터 침투 시켰다.
    오늘이 지긋지긋한 마약조직을 끝장 내버릴 마지막 기회다!"
    `, // 테마 시놉시스
  userRating: 3.3, // 평점
  userActivity: 3.4, // 활동성
  userFear: 4.4, // 공포도
  userDifficulty: 4.4, // 체감 난이도
  userCnt: 8, // 평가 인원
  isInterested: false,
};

const REVIEWDUMMY: IReviewData[] = [
  {
    userId: 1,
    nickname: "",
    reviewId: 1,
    content: "너무너무 재밌어요 눈물나요",
    userRating: 4.2,
    userActivity: 3.3,
    userFear: 4.4,
    userDifficulty: 2.2,
    createTime: "2023-03-13",
    isSuccess: 0, // 1: 성공 0 : 실파
  },
  {
    userId: 1,
    nickname: "",
    reviewId: 1,
    content: "너무너무 재밌어요 눈물나요",
    userRating: 4.2,
    userActivity: 3.3,
    userFear: 4.4,
    userDifficulty: 2.2,
    createTime: "2023-03-13",
    isSuccess: 1, // 1: 성공 0 : 실파
  },
];

export default function LikeThemesSection() {
  const [interests, setInterests] = useState<UserInterestTheme[]>([]);

  const [open, setOpen] = useState(false);
  const [themeId, setThemeId] = useState(0);
  const [data, setData] = useState<IDetailData>(initData);
  const [reviews, setReviews] = useState<IReviewData[]>(REVIEWDUMMY);

  const handleOpen = async (themeId: number) => {
    setThemeId(themeId);
    await requestDetailData(themeId);
    await requestReviews(themeId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReviews = async (review: IReviewData) => {
    setReviews((prev) => {
      return [review, ...prev];
    });
  };

  const requestDetailData = async (themeId: number) => {
    if (themeId !== 0) {
      try {
        const res = await getDetail(themeId);
        setData(res.data.theme);
        console.log(res.data.theme);
      } catch (err) {
        throw new Error("Internal Server Error!");
      }
    }
  };

  const requestReviews = async (themeId: number) => {
    if (themeId !== 0) {
      try {
        const res = await getReviews(themeId);
        themeId !== 0 && setReviews(res.data.reviews);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchInterests = async () => {
      const userId = Number(localStorage.getItem("userId"));
      try {
        const response = await getUserInterests(userId);
        // console.log(response);
        setInterests(response.data.interestThemes as UserInterestTheme[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInterests();
  }, []);

  return (
    <SectionWrapper>
      <SectionTitle>관심 테마</SectionTitle>
      <SectionContentWrapper>
        <OverflowWrapper>
          {interests.map((interest) => (
            <>
              <SliderItem key={interest.previewThemeResponse.themeId}>
                <PosterItem src={interest.previewThemeResponse.imgUrl} />
                <Hover
                  className="card-hover"
                  onClick={() =>
                    handleOpen(interest.previewThemeResponse.themeId)
                  }
                >
                  <span style={{ padding: "0 2rem" }}>
                    {interest.previewThemeResponse.title}
                  </span>
                </Hover>
              </SliderItem>
            </>
          ))}
          {themeId !== undefined && (
            <Modal
              open={open}
              onClose={handleClose}
              themeId={themeId}
              data={data}
              reviews={reviews}
              handleReviews={handleReviews}
            />
          )}
        </OverflowWrapper>
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
  border-radius: 1.5rem;
  height: 91%;
  @media (max-height: 800px) {
    height: 87%;
  }
  padding: 1.5rem;
  background-color: ${theme.colors.containerLight};
`;

const OverflowWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1.5rem;
  border-radius: 1.5rem;
  height: 100%;
`;

// const ThemeItem = styled.div`
//   border-radius: 1rem;
//   box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
//   width: 22rem;
//   height: 29.3rem;
//   @media (max-height: 800px) {
//     width: 15rem;
//     /* width: 18rem; */
//     height: 20rem;
//   }
//   @media (max-height: 755px) {
//     width: 17rem;
//     height: 23.5rem;
//   }
//   background-color: #3e2133;
// `;

const SliderItem = styled.div`
  position: relative;
  :hover {
    & > .card-hover {
      opacity: 0.8;
    }
  }
  @media (max-height: 766px) {
    width: 15rem;
    height: 20rem;
  }
`;

const PosterItem = styled.img`
  width: 20rem;
  height: 25rem;
  cursor: pointer;
  border-bottom: 1rem;
  border-radius: 1rem;
  @media (max-height: 766px) {
    width: 15rem;
    height: 20rem;
  }
`;

const Hover = styled.div`
  width: 20rem;
  height: 25rem;
  position: absolute;
  opacity: 0;
  background-color: black;
  top: 0;
  left: 0;
  transition: all 0.5s;
  border-radius: 1rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  @media (max-height: 766px) {
    width: 15rem;
    height: 20rem;
  }
`;
