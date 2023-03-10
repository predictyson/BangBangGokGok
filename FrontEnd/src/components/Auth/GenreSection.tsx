import React, { useState } from "react";
import { styled as mstyled } from "@mui/material/styles";
import styled from "styled-components";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const values = [
  "장르1",
  "장르2",
  "장르3",
  "장르4",
  "장르5",
  "장르6",
  "장르7",
  "장르8",
  "장르9",
  "장르10",
  "장르11",
  "장르12",
  "장르13",
  "장르14",
  "장르15",
  "장르16",
  "장르17",
  "장르18",
];

export default function GenreSection() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newAlignment: string[]
  ) => {
    setSelectedValues(newAlignment);
    console.log(selectedValues);
  };

  return (
    <Container>
      <ToggleButtonGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto",
          gridGap: "20px",
          padding: "10px",
          width: "100%",
          borderRadius: "10px",
        }}
        value={selectedValues}
        onChange={handleChange}
      >
        {values.map((item) => (
          <CustomToggleButton value={item} key={item}>
            {item}
          </CustomToggleButton>
        ))}
      </ToggleButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .Mui-selected {
    background-color: red;
  }
`;

const CustomToggleButton = mstyled(ToggleButton)`
  height: 9rem;
  background-color: #FFF1F8;
  border-radius: 1.5rem !important;
  font-size: 3rem;
  color: #58424D;
  font-weight: bold;
  
  & .Mui-selcted  {
    background-color: red ;
  }
  
  :hover {
    background-color: #58424D;
    color: #FFF1F8;

  }
`;
