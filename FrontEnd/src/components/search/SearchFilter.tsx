import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";

export default function SearchFilter() {
  return (
    <>
      <FilterButton>필터</FilterButton>
      <FilterContainer>
        <FilterItem>지역</FilterItem>
        <FilterItem>장르</FilterItem>
        <FilterItem>난이도</FilterItem>
        <FilterItem>인원</FilterItem>
        <FilterItem>시간</FilterItem>
        <FilterOkayButton color="info">필터 적용</FilterOkayButton>
        <FilterCancelButton>취소</FilterCancelButton>
        <Button variant="contained">Contained</Button>
      </FilterContainer>
    </>
  );
}

const FilterContainer = mstyled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid white;
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const FilterItem = mstyled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
`;

const FilterButton = mstyled(Button)`
  border-radius: 10px;
  color: white;
`;

const FilterOkayButton = mstyled(Button)({});
const FilterCancelButton = mstyled(Button)({});
