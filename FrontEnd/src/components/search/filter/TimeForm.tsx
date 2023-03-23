import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";

export default function TimeForm() {
  const [time, setTime] = useState("0");
  const handleTimeChange = (event: SelectChangeEvent<unknown>) => {
    setTime(event.target.value as string);
  };

  return (
    <Wrapper>
      <div style={{ flexBasis: "15%" }}>
        <CustomInputLabel id="time-select">시간</CustomInputLabel>
      </div>
      <div style={{ flexBasis: "85%" }}>
        <CustomSelect
          labelId="time-select"
          value={time}
          color="warning"
          onChange={handleTimeChange}
        >
          <MenuItem value="0">전체</MenuItem>
          <MenuItem value="1">60분 이내</MenuItem>
          <MenuItem value="2">60분 ~ 90분</MenuItem>
          <MenuItem value="3">90분 이상</MenuItem>
        </CustomSelect>
      </div>
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
  width: "11.5rem",
  height: "4rem",
  fontSize: "1.2rem",
  border: "1px solid white",
  color: "white",
  svg: {
    color: "white",
  },
});
