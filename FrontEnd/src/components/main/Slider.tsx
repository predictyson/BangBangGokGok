import React from "react";
import styled from "styled-components";
import EyeIcon from "@/assets/main/EyeIcon.png";
import Slider from "react-slick";
import DummyImg from "@/assets/main/SliderDummy.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BasicSlider() {
  const settings = {
    centerMode: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
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
