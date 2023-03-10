import React, { useState } from "react";

export default function PeopleForm() {
  const [people, setPeople] = useState("전체");
  const handlePeopleChange = (event) => {
    setPeople(event.target.value);
  };

  return (
    <div>
      <label htmlFor="people-select">인원</label>
      <select
        id="people-select"
        name="people"
        value={people}
        onChange={handlePeopleChange}
      >
        <option value="0">전체</option>
        <option value="1">1명</option>
        <option value="2">2명</option>
        <option value="3">3명</option>
        <option value="4">4명</option>
        <option value="5">5명</option>
        <option value="6">6명</option>
      </select>
    </div>
  );
}
