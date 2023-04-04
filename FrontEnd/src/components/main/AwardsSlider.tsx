import React, { FC, MouseEventHandler, useState, useEffect } from "react";
import styled from "styled-components";
import Slider, { CustomArrowProps } from "react-slick";
import PrevArrow from "@/assets/common/PrevArrow.png";
import NextArrow from "@/assets/common/NextArrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "./Modal";
import { IAwardSlider, IAwardTheme } from "types/slider";
import { IDetailData, IReviewData, IDetailLogin } from "types/detail";
import { getDetail, getDetailLogin } from "@/api/theme";
import { getReviews } from "@/api/review";
interface IProps {
  awardData: IAwardSlider;
}
interface ArrowProps extends CustomArrowProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function AwardsSlider(awardData: IProps) {
  const [open, setOpen] = useState(false);
  const [themeId, setThemeId] = useState(0);
  const [reviews, setReviews] = useState<IReviewData[]>(REVIEWDUMMY);
  const [data, setData] = useState<IDetailData>(initData);

  const isLogin = localStorage.getItem("userId") !== null ? true : false;
  const handleOpen = async (themeId: number) => {
    await setThemeId(themeId);
    await requestReviews(themeId);
    await requestDetailData(themeId);
    await setOpen(true);
    console.log("handleOpen Award : " + themeId);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleReviews = async (review: IReviewData) => {
    await setReviews((prev) => {
      return [review, ...prev];
    });
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
  const CustomPrevArrow: FC<ArrowProps> = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <img
          src={PrevArrow}
          style={{ width: "2rem", height: "5rem", marginLeft: "-3rem" }}
          alt="prev-arrow"
        />
      </div>
    );
  };

  const CustomNextArrow: FC<ArrowProps> = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <img
          src={NextArrow}
          style={{ width: "2rem", height: "5rem", marginLeft: "3rem" }}
          alt="next-arrow"
        />
      </div>
    );
  };
  const settings = {
    centerMode: true,
    dots: false,
    infinite: true,
    slidesToShow: 4.5,
    slidesToScroll: 4.5,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: BREAKPOINT,
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

  const awarddata = awardData.awardData;
  return (
    <Container>
      <TitleWrapper>
        <Icon
          src="https://icon-library.com/images/prize-icon/prize-icon-5.jpg"
          alt="icon"
        />
        <Title>{awarddata.year}년도 어워즈 수상작</Title>
      </TitleWrapper>
      <Slider {...settings}>
        {awarddata.theme.map((theme: IAwardTheme) => (
          <SliderItem key={theme.themeId}>
            <SliderTitleWrapper>
              <img
                src="https://user-images.githubusercontent.com/55784772/227142184-4680b14f-4d30-4699-a62e-8b258803b9db.png"
                alt="left"
              />
              <span className="title">{theme.awardName}</span>
              <img
                src="https://user-images.githubusercontent.com/55784772/227142176-55d00e0c-d111-4fa0-880a-29a75030bb8d.png"
                alt="right"
              />
            </SliderTitleWrapper>
            <SliderMaterialWrapper>
              <PosterItem src={theme.imgUrl} />
              <Hover
                className="card-hover"
                onClick={() => handleOpen(theme.themeId)}
              >
                {theme.title}
              </Hover>
            </SliderMaterialWrapper>
          </SliderItem>
        ))}
      </Slider>
      {themeId !== undefined && (
        <Modal
          reviews={reviews}
          open={open}
          onClose={handleClose}
          themeId={themeId}
          data={data}
          handleReviews={handleReviews}
        />
      )}
    </Container>
  );
}
const SliderMaterialWrapper = styled.div`
  width: 22rem;
  margin: 0 auto;
  :hover {
    & > .card-hover {
      opacity: 0.8;
    }
  }
`;

const PosterItem = styled.img`
  width: 22rem;
  height: 28rem;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 1rem;
`;
const SliderTitleWrapper = styled.div`
  width: 25rem;
  height: 5rem;
  font-size: 2rem;
  margin: 1rem auto;
  text-align: center;
  display: flex;
  justify-content: center;
  span {
    margin-bottom: 0.2rem;
    font-size: 1.8rem;
    font-weight: 400;
    align-items: center;
    display: flex;
  }
  .title {
    margin: auto 0;
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
`;
const Container = styled.div`
  width: 90%;
  margin: auto auto;
  margin-top: 0;
  .slick-prev:before {
    display: none;
  }
  .slick-next:before {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-top: 10rem;
  margin-bottom: 4rem;
`;
const Icon = styled.img`
  width: 3rem;
  height: 3rem;
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
  color: white;
  font-family: Pretendard;
  margin-left: 1.2rem;
`;

const SliderItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Hover = styled.div`
  width: 22rem;
  height: 28rem;
  position: absolute;
  opacity: 0;
  background-color: black;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.5s;
  border-radius: 1rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 7rem auto;
  cursor: pointer;
`;

const BREAKPOINT = [
  {
    breakpoint: 2000,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5,
      infinite: true,
    },
  },
  {
    breakpoint: 1920,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5,
      infinite: true,
    },
  },
  {
    breakpoint: 1600,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: true,
    },
  },
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
