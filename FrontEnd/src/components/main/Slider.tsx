import React, { FC, MouseEventHandler, useState, useEffect } from "react";
import styled from "styled-components";
import Slider, { CustomArrowProps } from "react-slick";
import PrevArrow from "@/assets/main/PrevArrow.png";
import NextArrow from "@/assets/main/NextArrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ISliderData, IThemeData } from "types/slider";
import Modal from "./Modal";
import { IDetailData } from "types/detail";
import { getDetail } from "@/api/theme";
interface IProps {
  topData: ISliderData[];
  isRecommendSlider: boolean;
}
export default function BasicSlider({ topData, isRecommendSlider }: IProps) {
  interface ArrowProps extends CustomArrowProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
  }
  const [open, setOpen] = useState(false);
  const [themeId, setThemeId] = useState(0);
  const [data, setData] = useState<IDetailData>(initData);
  const handleOpen = async (themeId: number) => {
    await setThemeId(themeId);
    await requestDetailData(themeId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const CustomPrevArrow: FC<ArrowProps> = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <img
          src={PrevArrow}
          style={{ width: "2rem", height: "5rem" }}
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
          style={{ width: "2rem", height: "5rem", marginLeft: "1rem" }}
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

  return (
    <Container>
      {topData.map((item, idx) => (
        <>
          {isRecommendSlider ? (
            <RecommendTitle className="recommend">
              {localStorage.getItem("nickname") + item.label}
            </RecommendTitle>
          ) : (
            <TitleWrapper>
              <Icon src={ICONLIST[idx]} alt="icon" />
              <Title>{item.label}</Title>
            </TitleWrapper>
          )}
          <Slider {...settings}>
            {item.themes.map((theme: IThemeData) => (
              <>
                <SliderItem key={theme.themeId}>
                  <PosterItem src={theme.imgUrl} />
                  <Hover
                    className="card-hover"
                    onClick={() => handleOpen(theme.themeId)}
                  >
                    <span style={{ padding: "0 2rem" }}>{theme.title}</span>
                  </Hover>
                </SliderItem>
              </>
            ))}
          </Slider>
          {themeId !== undefined && (
            <Modal
              open={open}
              onClose={handleClose}
              themeId={themeId}
              data={data}
            />
          )}
        </>
      ))}
    </Container>
  );
}

const PosterItem = styled.img`
  width: 20rem;
  height: 25rem;
  cursor: pointer;
  border-bottom: 1rem;
  border-radius: 1rem;
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

const RecommendTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  font-family: Pretendard;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
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
  :hover {
    & > .card-hover {
      opacity: 0.8;
    }
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
`;

const ICONLIST = [
  "https://user-images.githubusercontent.com/55784772/224244356-4b23a520-1b98-4a5f-a0ab-08b2c2fa3685.png",
  "https://user-images.githubusercontent.com/55784772/224244351-f487bf83-9e70-4a82-873b-57c5076abff6.png",
  "https://user-images.githubusercontent.com/55784772/224244359-d37e4b92-49fc-4584-97b9-06147d5a3bb2.png",
];

const BREAKPOINT = [
  {
    breakpoint: 2000,
    settings: {
      slidesToShow: 5.5,
      slidesToScroll: 5.5,
      infinite: true,
    },
  },
  {
    breakpoint: 1920,
    settings: {
      slidesToShow: 4.5,
      slidesToScroll: 4.5,
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
