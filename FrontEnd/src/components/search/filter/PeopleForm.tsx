import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";

export default function PeopleForm() {
  const [people, setPeople] = useState("0");
  const handlePeopleChange = (event: SelectChangeEvent<unknown>) => {
    setPeople(event.target.value as string);
  };

  return (
    <Wrapper>
      <CustomInputLabel id="people-select">인원</CustomInputLabel>
      <CustomSelect
        labelId="people-select"
        value={people}
        onChange={handlePeopleChange}
      >
        <MenuItem value="0">전체</MenuItem>
        <MenuItem value="1">1명</MenuItem>
        <MenuItem value="2">2명</MenuItem>
        <MenuItem value="3">3명</MenuItem>
        <MenuItem value="4">4명</MenuItem>
        <MenuItem value="5">5명</MenuItem>
        <MenuItem value="6">6명</MenuItem>
      </CustomSelect>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  font-size: 1.8rem;
  border-radius: 10px;
  color: white;
`;

const CustomInputLabel = mstyled(InputLabel)({
  fontSize: "1.7rem",
  fontWeight: "600",
  color: "white",
  marginRight: "1.5rem",
});

const CustomSelect = mstyled(Select)({
  width: "10rem",
  height: "4rem",
  fontSize: "1.2rem",
  border: "1px solid white",
  color: "white",
  svg: {
    color: "white",
  },
});
