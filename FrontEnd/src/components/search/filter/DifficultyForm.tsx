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

export default function DifficultyForm(props: DifficultyFormProps) {
  const [sliderValue, setValue] = useState([
    props.filterValue.difficultyS,
    props.filterValue.difficultyE,
  ]);

  // 슬라이더 이동 시 실행되는 콜백함수
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

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
        difficultyS: newValue[0] as DifficultyOption,
      },
    });
    props.handleFilterValueChange({
      type: "difficultyE",
      newValue: {
        ...props.filterValue,
        difficultyE: newValue[1] as DifficultyOption,
      },
    });
  };

  return (
    <Wrapper>
      <div style={{ flexBasis: "15%" }}>
        <InputLabel id="difficulty-slider" sx={labelStyle}>
          난이도
        </InputLabel>
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

const minDistance = 0.5;

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
  marginRight: "1rem",
};

const CustomSlider = mstyled(Slider)({
  color: `${theme.colors.pink}`,
});
