import React, { useState } from "react";
import Slider from "@mui/material/Slider";

export default function DifficultyForm() {
  const [value, setValue] = useState([1, 5]);
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div>
      <label htmlFor="difficulty-slider">난이도</label>
      <Slider
        id="difficulty-slider"
        color="info"
        size="small"
        min={1}
        max={5}
        step={0.5}
        marks
        valueLabelDisplay="auto"
        value={value}
        onChange={handleChange}
        disableSwap
      />
    </div>
  );
}

const minDistance = 0.5;
