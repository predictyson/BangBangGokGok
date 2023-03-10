import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OkButton from "@components/common/UI/OkButton";
import CancelButton from "@components/common/UI/CancelButton";
import LocationForm from "@components/search/filter/LocationForm";
import GenreForm from "./filter/GenreForm";
import PeopleForm from "./filter/PeopleForm";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";

export default function SearchFilter() {
  return (
    <>
      <FilterButton>필터</FilterButton>
      <FilterContainer>
        <LocationForm />
        <GenreForm />
        <FilterItem>난이도</FilterItem>
        <PeopleForm />
        <FilterItem>인원</FilterItem>
        <FilterItem>시간</FilterItem>
        <OkButton>필터 적용</OkButton>
        <CancelButton>취소</CancelButton>
      </FilterContainer>
    </>
  );
}

const FilterContainer = mstyled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;
  border: 0.2rem solid white;
  border-radius: 1.5rem;
  background-color: ${theme.colors.background};
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
