import React, { useState } from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

export default function SearchSortOptions() {
  const [sortOption, setSortOption] = useState("평점")
  const handleSortOptionChange = (option: string) => {
    setSortOption(option)
  }
  // useRef를 사용해서 각 Button에 대한 ref를 만들고
  // ref.current를 사용해서 각 Button의 variant를 바꿔준다.
  // 언제 바꿔줄까? sortOption이 바뀔 때마다 바꿔준다.
  // 어떻게 바꿔줄까? sortOption이 바뀔 때마다 각 Button의 variant를 바꿔준다.
  // 어떻게 각 Button의 variant를 바꿔줄까?
  // 각 Button의 variant를 바꿔주는 함수를 만들어서 사용한다.
  // 어떻게 각 Button의 variant를 바꿔주는 함수를 만들까?

  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={() => handleSortOptionChange("평점")}
        variant={sortOption === "평점" ? "contained" : "outlined"}
      >
        평점 순 정렬
      </Button>
      <Button
        onClick={() => handleSortOptionChange("활동성")}
        variant={sortOption === "평점" ? "contained" : "outlined"}
      >
        활동성 순 정렬
      </Button>
      <Button
        onClick={() => handleSortOptionChange("공포도")}
        variant={sortOption === "평점" ? "contained" : "outlined"}
      >
        공포도 순 정렬
      </Button>
      <Button
        onClick={() => handleSortOptionChange("체감 난이도")}
        variant={sortOption === "평점" ? "contained" : "outlined"}
      >
        체감 난이도 순 정렬
      </Button>
    </Stack>
  )
}

const OPTIONS: string[] = ["평점", "활동성", "공포도", "체감 난이도"]
