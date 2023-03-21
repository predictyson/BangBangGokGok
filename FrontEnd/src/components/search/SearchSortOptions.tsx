import React, { useState } from "react";
import { styled as mstyled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function SearchSortOptions() {
  const [sortOption, setSortOption] = useState<string>(OPTIONS[0]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSortOptionChange = (option: string) => {
    if (sortOption === option) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortOrder("desc");
    }
    setSortOption(option);
  };

  return (
    <Stack direction="row" spacing={2}>
      {OPTIONS.map((option) => (
        <OptionButton
          key={option}
          onClick={() => handleSortOptionChange(option)}
          variant={sortOption === option ? "outlined" : "contained"}
        >
          {option} 순 정렬
          {sortOption === option && sortOrder === "desc" && "▼"}
          {sortOption === option && sortOrder === "asc" && "▲"}
          {sortOption !== option && ""}
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
  font-weight: 600;
  &.MuiButton-contained {
    color: #FFF1F8;
    background-color: #58424D;
  }
  &.MuiButton-outlined {
    color: black;
    background-color: #FFF1F8;
  }
`;
