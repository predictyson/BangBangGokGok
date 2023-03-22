import React from "react";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import { theme } from "@/styles/theme";
import Line from "@/assets/common/Line.png";
import { IReviewData } from "types/detail";
interface IProps {
  data: IReviewData;
}

export default function ReviewItem({ data }: IProps) {
  const time = data.record.split(":");
  return (
    <>
      <img
        src={Line}
        alt="line"
        style={{ width: "100%", margin: "1rem auto" }}
      />
      <ReviewBox>
        <Header>
          <div className="left-wrapper">
            {data.user.nickname}
            {data.isSuccess ? (
              <>
                <Badge className="green">성공</Badge>
              </>
            ) : (
              <Badge className="red">실패</Badge>
            )}
          </div>
          <div className="right-wrapper">{data.createTime}</div>
        </Header>
        <RatingWrapper>
          <div className="ratingItem">
            후기 평점
            <Rating
              name="readonly"
              value={data.rating}
              style={{ marginLeft: "1rem" }}
              size="large"
              readOnly
            />
          </div>
          <div className="ratingItem">
            체감 난이도
            <Rating
              name="readonly"
              value={data.difficulty}
              style={{ marginLeft: "1rem" }}
              size="large"
              readOnly
            />
          </div>
          <div className="ratingItem">
            체감 공포도
            <Rating
              name="readonly"
              value={data.fear}
              style={{ marginLeft: "1rem" }}
              size="large"
              readOnly
            />
          </div>
          <div className="ratingItem">
            체감 활동성
            <Rating
              name="readonly"
              value={data.activity}
              style={{ marginLeft: "1rem" }}
              size="large"
              readOnly
            />
          </div>
        </RatingWrapper>
        <Content>{data.content}</Content>
      </ReviewBox>
    </>
  );
}

const Content = styled.div`
  margin-top: 1rem;
  font-size: 1.4rem;
`;
const RatingWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  .ratingItem {
    font-size: 1.4rem;
    font-weight: ${theme.fontWeight.medium};
    color: white;
    display: flex;
    align-items: center;
  }
`;
const ReviewBox = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
  padding-bottom: 1rem;
`;

const Header = styled.div`
  display: flex;
  color: white;
  justify-content: space-between;
  font-size: 1.6rem;
  align-items: center;
  .time-left {
    margin-left: 1.5rem;
  }
  .left-wrapper {
    display: flex;
    align-items: center;
  }
`;

const Badge = styled.div`
  font-size: 1.4rem;
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;
  margin-left: 1.2rem;
  font-weight: bold;
  color: white;
  border: solid 2px white;
  background-color: ${(props) =>
    props.className === "red" ? "#FF6161" : "#76FF7B"};
`;
