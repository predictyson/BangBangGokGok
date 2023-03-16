import React from "react";
import styled from "styled-components";

interface IProps {
  data: IReviewData[];
}
export default function ReviewItem({ data }: IProps) {
  console.log("REVIEW ITEM : " + data);
  return (
    <Container>
      <h1>DDDDD</h1>
    </Container>
  );
}

const Container = styled.div`
  height: 8rem;
  width: 100%;
  border: solid 1px white;
`;

const Header = styled.div``;
