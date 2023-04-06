import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { FilterValue, ReducerAction, PeopleOption } from "types/search";

interface PeopleFormProps {
  filterValue: FilterValue;
  handleFilterValueChange: (action: ReducerAction) => void;
}

export default function PeopleForm(props: PeopleFormProps) {
  const [people, setPeople] = useState<PeopleOption>(props.filterValue.people);
  const handlePeopleChange = (event: SelectChangeEvent<unknown>) => {
    setPeople(event.target.value as PeopleOption);
    props.handleFilterValueChange({
      type: "people",
      newValue: {
        ...props.filterValue,
        people: event.target.value as PeopleOption,
      },
    });
  };

  return (
    <Wrapper>
      <div style={{ flexBasis: "15%" }}>
        <CustomInputLabel id="people-select">인원</CustomInputLabel>
      </div>
      <div style={{ flexBasis: "85%" }}>
        <CustomSelect
          labelId="people-select"
          value={people}
          color="warning"
          onChange={handlePeopleChange}
        >
          <MenuItem value={0}>전체</MenuItem>
          <MenuItem value={1}>1명</MenuItem>
          <MenuItem value={2}>2명</MenuItem>
          <MenuItem value={3}>3명</MenuItem>
          <MenuItem value={4}>4명</MenuItem>
          <MenuItem value={5}>5명</MenuItem>
          <MenuItem value={6}>6명</MenuItem>
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
