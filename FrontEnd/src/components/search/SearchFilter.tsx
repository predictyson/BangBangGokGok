import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useMediaQuery } from "@mui/material";
import LocationForm from "@components/search/filter/LocationForm";
import GenreForm from "./filter/GenreForm";
import DifficultyForm from "./filter/DifficultyForm";
import PeopleForm from "./filter/PeopleForm";
import TimeForm from "./filter/TimeForm";
import TuneIcon from "@mui/icons-material/Tune";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { FilterValue, ReducerAction } from "types/search";

interface SearchFilterProps {
  filterValue: FilterValue;
  handleFilterValueChange: (action: ReducerAction) => void;
  dumpFilterGenreCategoryInputValue: string;
  handleDumpFilterGenreCategoryInputValueChange: (
    genreCategoryInputValue: string
  ) => void;
  handleSubmit: (isInitSearch: boolean) => void;
}

export default function SearchFilter(props: SearchFilterProps) {
  const [filterOpenState, setFilterOpenState] = useState<boolean>(false);
  const openFilter = () => {
    setFilterOpenState(true);
  };
  const closeFilter = () => {
    setFilterOpenState(false);
  };

  // 필터 초기화 버튼을 눌렀을 때 실행
  const handleResetFilter = () => {
    props.handleFilterValueChange({
      type: "reset",
      newValue: {} as FilterValue,
    });
    props.handleDumpFilterGenreCategoryInputValueChange("전체");
    closeFilter();
  };

  // 이 함수는 필터 적용 버튼을 눌렀을 때 실행
  // 필터 결과를 적용시켜서 검색 API를 보내는 역할을 한다.
  const requestSearchWithFilter = () => {
    props.handleSubmit(true);
    closeFilter();
  };

  const isLabtop = useMediaQuery("(max-height: 800px)");

  return (
    <>
      <FilterButton onClick={filterOpenState ? closeFilter : openFilter}>
        <TuneIcon fontSize="inherit" />
        필터
      </FilterButton>
      <Modal
        open={filterOpenState}
        onClose={closeFilter}
        sx={isLabtop ? ModalStyleOnLabtop768p : ModalStyleOnDesktop1080p}
        // hideBackdrop={true}
      >
        <FilterContainer>
          <LocationForm
            filterValue={props.filterValue}
            handleFilterValueChange={props.handleFilterValueChange}
          />
          <GenreForm
            filterValue={props.filterValue}
            handleFilterValueChange={props.handleFilterValueChange}
            dumpFilterGenreCategoryInputValue={
              props.dumpFilterGenreCategoryInputValue
            }
            handleDumpFilterGenreCategoryInputValueChange={
              props.handleDumpFilterGenreCategoryInputValueChange
            }
          />
          <DifficultyForm
            filterValue={props.filterValue}
            handleFilterValueChange={props.handleFilterValueChange}
          />
          <PeopleForm
            filterValue={props.filterValue}
            handleFilterValueChange={props.handleFilterValueChange}
          />
          <TimeForm
            filterValue={props.filterValue}
            handleFilterValueChange={props.handleFilterValueChange}
          />
          <ButtonContainer>
            <OkButton onClick={requestSearchWithFilter}>필터 적용</OkButton>
            <CancelButton onClick={handleResetFilter}>초기화</CancelButton>
          </ButtonContainer>
        </FilterContainer>
      </Modal>
    </>
  );
}

const FilterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 1536px) {
    font-size: 2.5rem;
  }
  padding: 1rem 2rem;
  font-size: 3rem;
  font-weight: 600;
  border-radius: 10px;
  color: white;
  border: 0.3rem solid white;
  background: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FilterContainer = mstyled(Box)`
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;
  font-weight: 600;
  width: 31rem;
  gap: 1.5rem;
  padding: 4rem;
  border: 0.2rem solid white;
  border-radius: 1.5rem;
  background-color: ${theme.colors.background};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const ModalStyleOnLabtop768p = {
  position: "absolute",
  top: "21vh",
  left: "66vw",
  border: "none",
  background: "none",
  color: "white",
};

const ModalStyleOnDesktop1080p = {
  position: "absolute",
  top: "20vh",
  left: "73vw",
  border: "none",
  background: "none",
  color: "white",
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  margin-top: 2rem;
`;

const OkButton = styled.button`
  color: ${theme.colors.white};
  background-color: ${theme.colors.pink};
  border-radius: 10px;
  border: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  width: 100%;
`;

const CancelButton = styled.button`
  color: ${theme.colors.pink};
  background-color: ${theme.colors.white};
  border-radius: 10px;
  border: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  width: 100%;
`;
