import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled as mstyled } from "@mui/material/styles";

export default function SearchInput() {
  const [searchText, setSearchText] = useState("");
  return (
    <Box component="div">
      <CustomTextField fullWidth label="검색어를 입력하세요.">
        {searchText}
      </CustomTextField>
    </Box>
  );
}

const CustomTextField = mstyled(TextField)({
  "& .MuiInputBase-root": {
    color: "white",
    backgroundColor: "transparent",
    borderRadius: "20px",
    border: "1px solid white",
    "&:hover, &.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid white",
    },
    "&:after": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
    "&.Mui-focused": {
      color: "white",
    },
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
});
