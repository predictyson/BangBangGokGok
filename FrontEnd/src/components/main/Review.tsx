import React from "react";
import styled from "styled-components";
import Line from "@/assets/common/Line.png";
import { theme } from "@/styles/theme";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import Rating from "@mui/material/Rating";
import Chart from "chart.js";

interface IProps {
  data: IDetailData;
}

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function Review({ data }: IProps) {
  return (
    <Container>
      <Header>
        Reviews ( {data.reviews.length} ){" "}
        <WriteButton>
          <img
            src="https://user-images.githubusercontent.com/55784772/224926890-105d5d61-de32-47ca-ad36-5af4ee5fe137.png"
            style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }}
          />
          후기 작성하기
        </WriteButton>
      </Header>
      <img
        src={Line}
        alt="line"
        style={{ width: "100%", margin: "1rem auto" }}
      />
      <InfoWrapper>
        <InfoBox>
          <div className="title">사용자 총 평점</div>
          <div className="content-wrapper">
            <StyledRating
              name="customized-color"
              value={data.userRating}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              sx={{ fontSize: "2.5rem" }}
              readOnly
            />
            <span className="rating">{data.userRating}/5</span>
          </div>
        </InfoBox>
        <InfoBox>
          <div className="title">전체 리뷰 수 </div>
          <div className="content-wrapper" style={{ marginTop: "1.2rem" }}>
            <TextsmsOutlinedIcon sx={{ fontSize: "5rem" }} />
            <span className="rating">{data.reviews.length}</span>
          </div>
        </InfoBox>
        <InfoBox>
          <div className="title">평점 비율 </div>
        </InfoBox>
      </InfoWrapper>
    </Container>
  );
}

const canvas = document.getElementById("myChart") as HTMLCanvasElement;
const data = [10, 20, 30];
// const chart = new Chart(canvas, {
//   type: "bar",
//   data: {
//     labels: ["Label 1", "Label 2", "Label 3"],
//     datasets: [
//       {
//         data: data,
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//             max: 120,
//           },
//         },
//       ],
//     },
//   },
// });

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Pretendard;
  color: white;
  height: 10rem;
  padding: 2rem 4rem;
  .title {
    font-size: 1.6rem;
    text-align: center;
  }
  .rating {
    margin-left: 1.2rem;
    font-size: 2.4rem;
    font-weight: ${theme.fontWeight.extraBold};
  }
  .content-wrapper {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const InfoBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.6rem;
  font-family: Pretendard;
  font-weight: bold;
`;
const WriteButton = styled.div`
  border: solid 2px white;
  color: white;
  background-color: ${theme.colors.container};
  font-size: 1.6rem;
  margin-left: auto;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.container};
    background-color: white;
    border: solid 2px ${theme.colors.container};
  }
`;
