import React, { FC, MouseEventHandler } from "react";
import styled from "styled-components";
import EyeIcon from "@/assets/main/EyeIcon.png";
import Slider, { CustomArrowProps } from "react-slick";
import DummyImg from "@/assets/main/SliderDummy.png";
import PrevArrow from "@/assets/main/PrevArrow.png";
import NextArrow from "@/assets/main/NextArrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BasicSlider() {
  interface ArrowProps extends CustomArrowProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
  }

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
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <Container>
      <TitleWrapper>
        <Icon src={EyeIcon} alt="icon" />
        <Title>지역 별 인기 테마</Title>
      </TitleWrapper>
      <Slider {...settings}>
        {DUMMYLIST.map((item, idx) => (
          <SliderItem key={idx}>
            <img
              src={DummyImg}
              style={{ width: "26rem", height: "23rem" }}
            ></img>
          </SliderItem>
        ))}
      </Slider>
    </Container>
  );
}

const Container = styled.div`
  height: 29.3rem;
  width: 90%;
  margin: 0 auto;
  .slick-prev:before {
    display: none;
  }
  .slick-next:before {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 3rem;
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
  width: 10rem;
  height: 23rem;
`;

const DUMMYLIST = [
  {
    url: { DummyImg },
  },
  {
    url: { DummyImg },
  },
  {
    url: { DummyImg },
  },
  {
    url: { DummyImg },
  },
  {
    url: { DummyImg },
  },
  {
    url: { DummyImg },
  },
  {
    url: { DummyImg },
  },
  {
    url: { DummyImg },
  },
  {
    url: { DummyImg },
  },
];
