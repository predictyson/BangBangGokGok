import React, { FC, MouseEventHandler, useState } from "react";
import styled from "styled-components";
import Slider, { CustomArrowProps } from "react-slick";
import PrevArrow from "@/assets/main/PrevArrow.png";
import NextArrow from "@/assets/main/NextArrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { theme } from "@/styles/theme";
import Modal from "./Modal";
interface IProps {
  data: ISliderData[];
  isRecommendSlider: boolean;
}
export default function BasicSlider({ data, isRecommendSlider }: IProps) {
  interface ArrowProps extends CustomArrowProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
  }
  const [open, setOpen] = useState(false);
  const [themeId, setThemeId] = useState(0);
  const [label, setLabel] = useState("");
  const handleOpen = (themeId: number, label: string) => {
    setThemeId(themeId);
    setOpen(true);
    setLabel(label);
    console.log(label + " " + themeId);
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
    responsive: [
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
    ],
  };

  return (
    <Container>
      {data.map((item, idx) => (
        <>
          {isRecommendSlider ? (
            <RecommendTitle className="recommend">{item.label}</RecommendTitle>
          ) : (
            <TitleWrapper>
              <Icon src={ICONLIST[idx]} alt="icon" />
              <Title>{item.label}</Title>
            </TitleWrapper>
          )}
          <Slider {...settings}>
            {item.themes.map((theme) => (
              <>
                <SliderItem key={theme.themeId}>
                  <img
                    src={theme.imgUrl}
                    style={{
                      width: "20rem",
                      height: "25rem",
                      cursor: "pointer",
                    }}
                  />

                  <Hover
                    className="card-hover"
                    onClick={() => handleOpen(theme.themeId, item.label)}
                  >
                    {theme.title}
                  </Hover>
                </SliderItem>
              </>
            ))}
          </Slider>
          {(themeId && label) !== undefined && (
            <Modal
              open={open}
              onClose={handleClose}
              themeId={themeId}
              label={label}
            />
          )}
        </>
      ))}
    </Container>
  );
}

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
