import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function PeopleForm() {
  const [people, setPeople] = useState("0");
  const handlePeopleChange = (event: SelectChangeEvent) => {
    setPeople(event.target.value as string);
  };

  return (
    <Wrapper>
      <InputLabel id="people-select" sx={labelStyle}>
        인원
      </InputLabel>
      <Select
        variant="outlined"
        labelId="people-select"
        id="people-select"
        value={people}
        label="인원"
        onChange={handlePeopleChange}
        sx={selectStyle}
        IconComponent={() => <KeyboardArrowDownIcon sx={{ color: "white" }} />}
      >
        <MenuItem value="0">전체</MenuItem>
        <MenuItem value="1">1명</MenuItem>
        <MenuItem value="2">2명</MenuItem>
        <MenuItem value="3">3명</MenuItem>
        <MenuItem value="4">4명</MenuItem>
        <MenuItem value="5">5명</MenuItem>
        <MenuItem value="6">6명</MenuItem>
      </Select>
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

const labelStyle = {
  fontSize: "1.7rem",
  fontWeight: "600",
  color: "white",
};

const selectStyle = {
  width: "100",
  color: "white",
  border: "1px solid white",
};
