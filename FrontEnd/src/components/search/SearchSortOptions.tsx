import React, { useState } from "react";
import { styled as mstyled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function SearchSortOptions() {
  const [sortOption, setSortOption] = useState(OPTIONS[0]);
  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <Stack direction="row" spacing={2}>
      {OPTIONS.map((option) => (
        <OptionButton
          key={option}
          onClick={() => handleSortOptionChange(option)}
          variant={sortOption === option ? "contained" : "outlined"}
        >
          {option} 순 정렬
        </OptionButton>
      ))}
    </Stack>
  );
}

const OPTIONS: string[] = ["평점", "활동성", "공포도", "체감 난이도"];

const OptionButton = mstyled(Button)`
  font-size: 1.5rem;
  border-radius: 20px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  &.MuiButton-contained {
    color: white;
    background-color: black;
  }
  &.MuiButton-outlined {
    color: black;
    background-color: white;
  }
`;
