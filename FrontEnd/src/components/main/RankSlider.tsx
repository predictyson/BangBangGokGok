import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import DummyImg from "@/assets/common/DummyImg.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RankSlider() {
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
  };
  return (
    <Container>
      <Title>🔥 이번주 Hot한 테마</Title>
      <Slider {...settings}>
        {DUMMYLIST.map((item, idx) => (
          <>
            <SliderItem key={idx}>
              <Rank>{idx + 1}</Rank>
              <img
                src={DummyImg}
                alt="img"
                style={{ width: "18rem", height: "23rem" }}
              />
            </SliderItem>
          </>
        ))}
      </Slider>
    </Container>
  );
}

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
  img {
    margin-left: 2rem;
  }
`;

const Rank = styled.div`
  width: 7.5rem;
  font-family: Pretendard;
  font-size: 15rem;
  font-weight: bold;
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
