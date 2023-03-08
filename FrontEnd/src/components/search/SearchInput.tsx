import React, { useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

export default function SearchInput() {
  const [searchText, setSearchText] = useState("")
  return (
    <Box
      sx={{
        width: 300,
      }}
    >
      <TextField fullWidth label="검색어를 입력하세요.">
        {searchText}
      </TextField>
    </Box>
  )
}
