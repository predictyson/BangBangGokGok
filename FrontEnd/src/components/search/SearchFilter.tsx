import React from "react";
import Box from "@mui/material/Box";
import OkButton from "@components/common/UI/OkButton";
import CancelButton from "@components/common/UI/CancelButton";
import LocationForm from "@components/search/filter/LocationForm";
import GenreForm from "./filter/GenreForm";
import DifficultyForm from "./filter/DifficultyForm";
import PeopleForm from "./filter/PeopleForm";
import TimeForm from "./filter/TimeForm";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { useRef, useEffect } from "react";
import styled from "styled-components";

export default function SearchFilter() {
  const buttonRef = useRef();
  const dialogRef = useRef();

  useEffect(() => {
    const button = buttonRef.current;
    const dialog = dialogRef.current;

    const handleButtonClick = () => {
      dialog.showModal();
    };
    const handleDialogClose = () => {
      console.log(dialog.returnValue);
    };

    button.addEventListener("click", handleButtonClick);
    dialog.addEventListener("close", handleDialogClose);

    return () => {
      button.removeEventListener("click", handleButtonClick);
      dialog.removeEventListener("close", handleDialogClose);
    };
  });

  return (
    <>
      <FilterButton ref={buttonRef}>필터</FilterButton>
      <Modal ref={dialogRef}>
        <form method="dialog">
          <FilterContainer>
            <LocationForm />
            <GenreForm />
            <DifficultyForm />
            <PeopleForm />
            <TimeForm />
            <ButtonContainer>
              <OkButton>필터 적용</OkButton>
              <CancelButton>취소</CancelButton>
            </ButtonContainer>
          </FilterContainer>
        </form>
      </Modal>
    </>
  );
}

const FilterButton = styled.button`
  font-size: 1.8rem;
  border-radius: 10px;
  color: white;
  border: none;
  background: none;
  cursor: pointer;
`;

const FilterContainer = mstyled(Box)`
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;
  font-weight: 600;
  width: 22rem;
  gap: 1.5rem;
  padding: 4rem;
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

const Modal = styled.dialog`
  position: absolute;
  top: -5rem;
  left: 100rem;
  border: none;
  background: none;
  color: white;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;
