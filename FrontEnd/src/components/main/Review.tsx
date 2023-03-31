import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Line from "@/assets/common/Line.png";
import { theme } from "@/styles/theme";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import Chart from "@/components/main/Chart";
import ReviewItem from "@/components/main/ReviewItem";
import WriteReview from "./WriteReview";
import { styled as mstyled } from "@mui/material/styles";
import { IDetailData, IReviewData } from "types/detail";
interface IProps {
  data: IDetailData;
  themeId: number;
  reviews: IReviewData[];
  handleReviews: (review: IReviewData) => Promise<void>;
  isMyReview: boolean;
  handleMyReview: () => Promise<void>;
}
interface IBarData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

export default function Review({
  data,
  themeId,
  reviews,
  handleReviews,
  isMyReview,
  handleMyReview,
}: IProps) {
  const CHARTDATA = [data.userActivity, data.userFear, data.userDifficulty];

  const BARDATA: IBarData = {
    labels: ["활동성", "공포도", "체감 난이도"],
    datasets: [
      {
        label: "유저 평점",
        data: CHARTDATA,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };
  const [childOpen, setchildOpen] = React.useState(false);
  const handleOpen = () => {
    setchildOpen(true);
  };
  const handleClose = () => {
    setchildOpen(false);
  };

  console.log("IS MY REVIEW " + isMyReview);
  const isLogin = localStorage.getItem("userId") !== null ? true : false;
  return (
    <>
      <Header>
        Reviews
        {isLogin && isMyReview && (
          <DisableAnnounce>이미 후기를 작성한 테마입니다 </DisableAnnounce>
        )}
        {isLogin && !isMyReview && (
          <WriteButton onClick={handleOpen}>
            <img
              src="https://user-images.githubusercontent.com/55784772/224926890-105d5d61-de32-47ca-ad36-5af4ee5fe137.png"
              style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }}
            />
            후기 작성하기
          </WriteButton>
        )}
        <WriteReview
          themeId={themeId}
          handleClose={handleClose}
          childOpen={childOpen}
          data={data}
          handleReviews={handleReviews}
          handleMyReview={handleMyReview}
        />
      </Header>
      <img
        src={Line}
        alt="line"
        style={{ width: "100%", margin: "1rem auto" }}
      />
      <InfoWrapper>
        <InfoBox>
          <div className="title">사용자 총 평점 ( {data.userCnt} )</div>
          <div className="content-wrapper">
            <CustomFavorite width={"3rem"} fill={`${theme.colors.pink}`} />
            <span className="rating">{data.userRating}/5</span>
          </div>
        </InfoBox>
        <InfoBox>
          <div className="title">전체 리뷰 수 </div>
          <div className="content-wrapper" style={{ marginTop: "1.2rem" }}>
            <TextsmsOutlinedIcon sx={{ fontSize: "5rem" }} />
            <span className="rating">{reviews.length}</span>
          </div>
        </InfoBox>
        <InfoBox>
          <ChartWrapper>
            <Chart data={BARDATA} />
          </ChartWrapper>
        </InfoBox>
      </InfoWrapper>
      {reviews.map((item) => {
        return (
          <>
            <ReviewItem data={item} />
          </>
        );
      })}
    </>
  );
}
const CustomFavorite = mstyled(FavoriteIcon)`
  .css-v6ftt0-MuiSvgIcon-root {
    width: 4rem,
    fill:  ${theme.colors.pink},
  },
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  .css-1xm1aux-MuiSvgIcon-root {
    font-size: 3rem;
    color: ${theme.colors.pink};
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.6rem;
  font-family: Pretendard;
  font-weight: bold;
`;

const DisableAnnounce = styled.div`
  display: flex;
  font-weight: bold;
  color: ${theme.colors.pink};
  font-size: 1.4rem;
  height: 3.5rem;
  align-items: center;
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
