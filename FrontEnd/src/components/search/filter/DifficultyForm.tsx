import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { FilterValue, ReducerAction, DifficultyOption } from "types/search";

interface DifficultyFormProps {
  filterValue: FilterValue;
  handleFilterValueChange: (action: ReducerAction) => void;
}

const minDistance = 0.5;

export default function DifficultyForm(props: DifficultyFormProps) {
  const [sliderValue, setValue] = useState([
    props.filterValue.difficultyS,
    props.filterValue.difficultyE,
  ]);

  console.log(
    "sliderValue: ",
    sliderValue,
    "filterValue: ",
    props.filterValue.difficultyS,
    props.filterValue.difficultyE
  );

  // 슬라이더 이동 시 실행되는 콜백함수
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    // 슬라이더의 최소 간격을 유지하기 위한 조건문
    if (activeThumb === 0) {
      setValue([
        Math.min(newValue[0], sliderValue[1] - minDistance) as DifficultyOption,
        sliderValue[1],
      ]);
    } else {
      setValue([
        sliderValue[0],
        Math.max(newValue[1], sliderValue[0] + minDistance) as DifficultyOption,
      ]);
    }

    // filterValue dispatch
    props.handleFilterValueChange({
      type: "difficultyS",
      newValue: {
        ...props.filterValue,
        difficultyS: sliderValue[0] as DifficultyOption,
      },
    });
    props.handleFilterValueChange({
      type: "difficultyE",
      newValue: {
        ...props.filterValue,
        difficultyE: sliderValue[1] as DifficultyOption,
      },
    });
  };

  return (
    <Wrapper>
      <div style={{ flexBasis: "15%" }}>
        <CustomInputLabel id="difficulty-slider">난이도</CustomInputLabel>
        {/* <InputLabel id="difficulty-slider" sx={labelStyle}>
          난이도
        </InputLabel> */}
      </div>
      <div style={{ flexBasis: "85%" }}>
        <div style={{ width: "100%" }}>
          <CustomSlider
            id="difficulty-slider"
            size="small"
            min={1}
            max={5}
            step={0.5}
            marks
            valueLabelDisplay="auto"
            value={sliderValue}
            onChange={handleChange}
            disableSwap
          />
        </div>
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

const CustomSlider = mstyled(Slider)({
  color: `${theme.colors.pink}`,
});
