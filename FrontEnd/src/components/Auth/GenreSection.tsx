import React, { useState } from "react";
import { styled as mstyled } from "@mui/material/styles";
import styled from "styled-components";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function GenreSection(props: ProfileProps) {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newAlignment: number[]
  ) => {
    props.changeUserInfo("genreId", newAlignment);
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
        value={props.userInfo.genreId}
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

const CustomToggleButton = mstyled(ToggleButton)({
  height: "9rem",
  backgroundColor: "#FFF1F8",
  borderRadius: "1.5rem !important",
  fontSize: "3rem",
  fontWeight: "medium",
  color: "#58424D",

  "&.Mui-selected, &:hover": {
    backgroundColor: "#58424D",
    fontWeight: "bold",
    color: "#FFF1F8",
  },
});

// const CustomToggleButton = mstyled(ToggleButton)`
//   height: 9rem;
//   background-color: #FFF1F8;
//   border-radius: 1.5rem !important;
//   font-size: 3rem;
//   color: #58424D;
//   font-weight: bold;

//   &.Mui-selcted {
//     background-color: red ;
//   }

//   :hover {
//     background-color: #58424D;
//     color: #FFF1F8;

//   }
// `;
