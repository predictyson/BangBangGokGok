import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";

export default function GenreForm() {
  const [genre, setGenre] = useState("전체");
  const handleGenreChange = (event: SelectChangeEvent<unknown>) => {
    setGenre(event.target.value as string);
  };

  return (
    <Wrapper>
      <div style={{ flexBasis: "15%" }}>
        <CustomInputLabel id="genre-select">장르</CustomInputLabel>
      </div>
      <div style={{ flexBasis: "85%" }}>
        <CustomSelect
          labelId="genre-select"
          value={genre}
          color="warning"
          onChange={handleGenreChange}
        >
          <MenuItem value="전체">전체</MenuItem>
          <MenuItem value="공포">공포</MenuItem>
          <MenuItem value="추리">추리</MenuItem>
          <MenuItem value="스릴러">스릴러</MenuItem>
          <MenuItem value="판타지">판타지</MenuItem>
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
