import React, { FC, MouseEventHandler } from "react";
import styled from "styled-components";
import EyeIcon from "@/assets/main/EyeIcon.png";
import Slider, { CustomArrowProps } from "react-slick";
import DummyImg from "@/assets/main/SliderDummy.png";
import PrevArrow from "@/assets/main/PrevArrow.png";
import NextArrow from "@/assets/main/NextArrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IProps {
  data: ISliderData[];
}
export default function BasicSlider({ data }: IProps) {
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
      {data.map((item, idx) => (
        <>
          <TitleWrapper>
            <Icon src={ICONLIST[idx]} alt="icon" />
            <Title>{item.label}</Title>
          </TitleWrapper>
          <Slider {...settings}>
            {item.themes.map((theme) => (
              <SliderItem key={theme.themeId}>
                <img
                  src={theme.imgUrl}
                  style={{ width: "26rem", height: "23rem", cursor: "pointer" }}
                ></img>
              </SliderItem>
            ))}
          </Slider>
        </>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  margin: auto auto;
  /* padding-bottom: 5rem; */
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
  width: 10rem;
  height: 23rem;
`;

const ICONLIST = [
  "https://user-images.githubusercontent.com/55784772/224244356-4b23a520-1b98-4a5f-a0ab-08b2c2fa3685.png",
  "https://user-images.githubusercontent.com/55784772/224244351-f487bf83-9e70-4a82-873b-57c5076abff6.png",
  "https://user-images.githubusercontent.com/55784772/224244359-d37e4b92-49fc-4584-97b9-06147d5a3bb2.png",
];
