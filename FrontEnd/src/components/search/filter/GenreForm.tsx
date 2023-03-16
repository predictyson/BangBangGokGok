import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function GenreForm() {
  const [genre, setGenre] = useState("전체");
  const handleGenreChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  return (
    <Wrapper>
      <InputLabel id="genre-select" sx={labelStyle}>
        장르
      </InputLabel>
      <Select
        variant="outlined"
        labelId="genre-select"
        id="genre-select"
        value={genre}
        label="장르"
        onChange={handleGenreChange}
        sx={selectStyle}
        IconComponent={() => <KeyboardArrowDownIcon sx={{ color: "white" }} />}
      >
        <MenuItem value="전체">전체</MenuItem>
        <MenuItem value="공포">공포</MenuItem>
        <MenuItem value="추리">추리</MenuItem>
        <MenuItem value="스릴러">스릴러</MenuItem>
        <MenuItem value="판타지">판타지</MenuItem>
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
