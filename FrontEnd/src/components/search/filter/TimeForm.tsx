import React, { useState } from "react";

export default function TimeForm() {
  const [time, setTime] = useState(0);
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <label htmlFor="time-select">시간</label>
      <select
        id="time-select"
        name="time"
        value={time}
        onChange={handleTimeChange}
      >
        <option value="0">전체</option>
        <option value="1">60분 이내</option>
        <option value="2">60분 ~ 90분</option>
        <option value="3">90분 이상</option>
      </select>
    </div>
  );
}
