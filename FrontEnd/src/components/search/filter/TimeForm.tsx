import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function TimeForm() {
  const [time, setTime] = useState("0");
  const handleTimeChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };

  return (
    <Wrapper>
      <InputLabel id="time-select" sx={labelStyle}>
        시간
      </InputLabel>
      <Select
        variant="outlined"
        labelId="time-select"
        id="time-select"
        value={time}
        label="시간"
        onChange={handleTimeChange}
        sx={selectStyle}
        IconComponent={() => <KeyboardArrowDownIcon sx={{ color: "white" }} />}
      >
        <MenuItem value="0">전체</MenuItem>
        <MenuItem value="1">60분 이내</MenuItem>
        <MenuItem value="2">60분 ~ 90분</MenuItem>
        <MenuItem value="3">90분 이상</MenuItem>
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
