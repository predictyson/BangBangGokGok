import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "./Modal";
import { ISliderData, IThemeData } from "types/slider";
import { IReviewData, IDetailData, IDetailLogin } from "types/detail";
import { getDetail, getDetailLogin } from "@/api/theme";
import { getReviews } from "@/api/review";
interface IProps {
  data: IThemeData[];
}

export default function RankSlider({ data }: IProps) {
  const settings = {
    centerMode: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: BREAKPOINT,
  };
  const [reviews, setReviews] = useState<IReviewData[]>(REVIEWDUMMY);
  const [open, setOpen] = useState(false);
  const [themeId, setThemeId] = useState(0);
  const [detaildata, setDetailData] = useState<IDetailData>(initData);
  const [logindata, setLoginData] = useState<IDetailLogin>({
    isInterest: false,
    isMyReview: false,
  });

  const handleReviews = async (review: IReviewData) => {
    await setReviews((prev) => {
      return [review, ...prev];
    });
  };
  const handleOpen = async (themeId: number) => {
    await setThemeId(themeId);
    await requestDetailData(themeId);
    await requestReviews(themeId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  const requestDetailData = async (themeId: number) => {
    if (themeId !== 0) {
      try {
        const res = await getDetail(themeId);
        setDetailData(res.data.theme);
        console.log(res.data.theme);
      } catch (err) {
        throw new Error("Internal Server Error!");
      }
    }
  };

  return (
    <Container>
      <Title>🔥 이번주 Hot한 테마</Title>
      <Slider {...settings}>
        {data.map((item, idx) => (
          <>
            <SliderItem key={idx}>
              <Rank>{idx + 1}</Rank>
              <PosterWrapper>
                <img
                  src={item.imgUrl}
                  alt="img"
                  style={{ width: "18rem", height: "23rem" }}
                />
                <Hover
                  className="card-hover"
                  onClick={() => handleOpen(item.themeId)}
                >
                  {item.title}
                </Hover>
              </PosterWrapper>
            </SliderItem>
          </>
        ))}
      </Slider>
      {themeId !== undefined && (
        <Modal
          reviews={reviews}
          open={open}
          onClose={handleClose}
          themeId={themeId}
          data={detaildata}
          handleReviews={handleReviews}
        />
      )}
    </Container>
  );
}
const PosterWrapper = styled.div`
  :hover {
    & > .card-hover {
      opacity: 0.8;
    }
  }
`;
const Hover = styled.div`
  width: 18.4rem;
  height: 23rem;
  position: absolute;
  opacity: 0;
  background-color: black;
  top: 0;
  left: 35%;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  transition: all 0.5s;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
`;
const Container = styled.div`
  margin: 3rem auto;
  width: 90%;
`;

const Title = styled.div`
  margin: 3rem auto;
  font-size: 2.4rem;
  font-weight: bold;
  font-family: Pretendard;
  margin-top: 3rem;
`;

const SliderItem = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  @media (max-width: 1200px) {
    width: 10rem;
  }
  img {
    margin-left: 1.2rem;
    cursor: pointer;
  }
`;

const Rank = styled.div`
  width: 7.5rem;
  font-family: Pretendard;
  font-size: 15rem;
  font-weight: bold;
  @media (max-width: 1300px) {
    font-size: 12rem;
  }
  @media (max-width: 1100) {
    font-size: 10rem;
  }
`;

const BREAKPOINT = [
  {
    breakpoint: 1250,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
    },
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 2,
    },
  },
  {
    breakpoint: 640,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

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
