import React from "react";
import { styled as mstyled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { SortOption, SortOrder } from "types/search";

interface SearchSortOptionsProps {
  sortOption: SortOption;
  sortOrder: SortOrder;
  handleSortOptionOrderChange: (option: SortOption) => void;
}

const OPTIONS: string[] = ["평점", "체감 활동성", "체감 공포도", "체감 난이도"];

const OPTION_MAP: { [key: string]: SortOption } = {
  평점: "userRating",
  "체감 활동성": "userActivity",
  "체감 공포도": "userFear",
  "체감 난이도": "userDifficulty",
};

export default function SearchSortOptions(props: SearchSortOptionsProps) {
  const handleSortOptionOrderChange = (option: SortOption) => {
    props.handleSortOptionOrderChange(option);
  };

  return (
    <Stack direction="row" spacing={2}>
      {OPTIONS.map((option) => (
        <OptionButton
          key={option}
          onClick={() => handleSortOptionOrderChange(OPTION_MAP[option])}
          variant={
            props.sortOption === OPTION_MAP[option] ? "outlined" : "contained"
          }
        >
          {option} 순 정렬
          {props.sortOption === OPTION_MAP[option] &&
            props.sortOrder === "desc" &&
            "▼"}
          {props.sortOption === OPTION_MAP[option] &&
            props.sortOrder === "asc" &&
            "▲"}
          {props.sortOption !== OPTION_MAP[option] && ""}
        </OptionButton>
      ))}
    </Stack>
  );
}

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
