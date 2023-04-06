import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { FilterValue, ReducerAction, TimeOption } from "types/search";

interface TimeFormProps {
  filterValue: FilterValue;
  handleFilterValueChange: (action: ReducerAction) => void;
}
export default function TimeForm(props: TimeFormProps) {
  const [time, setTime] = useState(props.filterValue.time);
  const handleTimeChange = (event: SelectChangeEvent<unknown>) => {
    setTime(event.target.value as TimeOption);

    // filterValue dispatch
    props.handleFilterValueChange({
      type: "time",
      newValue: {
        ...props.filterValue,
        time: event.target.value as TimeOption,
      },
    });
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
          <CustomMenuItem value={0}>전체</CustomMenuItem>
          <CustomMenuItem value={1}>60분 이하</CustomMenuItem>
          <CustomMenuItem value={2}>60분 초과</CustomMenuItem>
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

const CustomInputLabel = mstyled(InputLabel)`
  font-size: 2.7rem;
  @media (max-width: 1536px) {
    font-size: 2.2rem;
  }
  font-weight: 600;
  color: white;
  margin-right: 1.5rem;
`;

const CustomSelect = mstyled(Select)`
  width: 11.5rem;
  height: 4rem;
  font-size: 2rem;
  @media (max-width: 1536px) {
    font-size: 1.7rem;
  }
  border: 1px solid white;
  color: white;
  svg {
    color: white;
  }
`;

const CustomMenuItem = mstyled(MenuItem)`
  font-size: 2rem;
  @media (max-width: 1536px) {
    font-size: 1.7rem;
  }
`;
