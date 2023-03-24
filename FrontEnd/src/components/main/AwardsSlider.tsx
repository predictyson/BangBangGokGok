import React, { FC, MouseEventHandler, useState } from "react";
import styled from "styled-components";
import Slider, { CustomArrowProps } from "react-slick";
import PrevArrow from "@/assets/main/PrevArrow.png";
import NextArrow from "@/assets/main/NextArrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "./Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IThemeData, IAwardSlider, IAwardTheme } from "types/slider";
interface IProps {
  awardData: IAwardSlider;
}
interface ArrowProps extends CustomArrowProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const years = [2019, 2020, 2021, 2022];
export default function AwardsSlider(awardData: IProps) {
  const [open, setOpen] = useState(false);
  const [themeId, setThemeId] = useState(0);
  const handleOpen = (themeId: number) => {
    setThemeId(themeId);
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
    responsive: [
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
    ],
  };
  // console.log(awardData.awardData[0]);
  const data = awardData.awardData;
  return (
    <Container>
      <TitleWrapper>
        <Icon
          src="https://icon-library.com/images/prize-icon/prize-icon-5.jpg"
          alt="icon"
        />
        <Title>{data.year}년도 어워즈 수상작</Title>
      </TitleWrapper>
      <Slider {...settings}>
        {data.theme.map((theme: IAwardTheme) => (
          <SliderItem key={theme.themeId}>
            <div
              style={{
                width: "25rem",
                height: "5rem",
                fontSize: "2rem",
                margin: "1rem auto ",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="https://user-images.githubusercontent.com/55784772/227142184-4680b14f-4d30-4699-a62e-8b258803b9db.png"
                alt="left"
              />
              <span
                style={{
                  marginTop: "auto",
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: "bold",
                }}
              >
                <span
                  style={{
                    marginBottom: "0.2rem",
                    fontSize: "1.6rem",
                    fontWeight: 400,
                  }}
                >
                  최고의
                </span>
                {theme.awardName}
              </span>
              <img
                src="https://user-images.githubusercontent.com/55784772/227142176-55d00e0c-d111-4fa0-880a-29a75030bb8d.png"
                alt="right"
              />
            </div>
            <img
              src={theme.imgUrl}
              style={{
                width: "22rem",
                height: "28rem",
                cursor: "pointer",
                margin: "0 auto",
              }}
            />
            <Hover
              className="card-hover"
              onClick={() => handleOpen(theme.themeId)} // , item.label)}
            >
              {theme.title}
            </Hover>
          </SliderItem>
        ))}
      </Slider>
      {themeId !== undefined && (
        <Modal open={open} onClose={handleClose} themeId={themeId} />
      )}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  z-index: 10;
`;
