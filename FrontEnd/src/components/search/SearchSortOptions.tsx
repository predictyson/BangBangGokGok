import React, { useState } from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

export default function SearchSortOptions() {
  const [sortOption, setSortOption] = useState("평점")

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">평점 순 정렬</Button>
      <Button variant="outlined">활동성 순 정렬</Button>
      <Button variant="outlined">공포도 순 정렬</Button>
      <Button variant="outlined">체감 난이도 순 정렬</Button>
    </Stack>
  )
}
