import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";

const LocationForm = () => {
  const [city, setCity] = useState("전체"); // regionBig
  const [location, setLocation] = useState("전체"); // regionSmall
  console.log(city, location);

  const handleCityChange = (event: SelectChangeEvent<unknown>) => {
    setCity(event.target.value as string);
    setLocation("전체");
  };

  const handleLocationChange = (event: SelectChangeEvent<unknown>) => {
    setLocation(event.target.value as string);
  };

  const renderLocationOptions = () => {
    // regionBig을 기준으로 regionSmall을 불러오는 API를 사용
    // response를 dummyData에 저장
    const dummyData = [
      "강남",
      "홍대",
      "건대",
      "동구",
      "서구",
      "제주시",
      "서귀포",
    ];

    return dummyData.map((data) => (
      <MenuItem value={data} key={data}>
        {data}
      </MenuItem>
    ));
  };

  return (
    <Wrapper>
      <CustomInputLabel id="city-select">지역</CustomInputLabel>
      <CustomSelect
        labelId="city-select"
        value={city}
        onChange={handleCityChange}
      >
        <MenuItem value="전체">전체</MenuItem>
        <MenuItem value="서울">서울</MenuItem>
        <MenuItem value="부산">부산</MenuItem>
        <MenuItem value="제주">제주</MenuItem>
      </CustomSelect>
      <CustomInputLabel id="location-select"></CustomInputLabel>
      <CustomSelect
        labelId="location-select"
        value={location}
        onChange={handleLocationChange}
        disabled={!city}
      >
        <MenuItem value="전체">전체</MenuItem>
        {renderLocationOptions()}
      </CustomSelect>
    </Wrapper>
  );
};

export default LocationForm;

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

const CustomInputLabel = mstyled(InputLabel)({
  fontSize: "1.7rem",
  fontWeight: "600",
  color: "white",
  marginRight: "1.5rem",
});

const CustomSelect = mstyled(Select)({
  width: "10rem",
  height: "4rem",
  fontSize: "1.2rem",
  border: "1px solid white",
  color: "white",
  svg: {
    color: "white",
  },
});
