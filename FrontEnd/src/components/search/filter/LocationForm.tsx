import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const LocationForm = () => {
  const [city, setCity] = useState("전체"); // regionBig
  const [location, setLocation] = useState("전체"); // regionSmall
  console.log(city, location);

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
    setLocation("전체");
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
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
      <InputLabel id="city-select" sx={labelStyle}>
        지역
      </InputLabel>
      <Select
        variant="outlined"
        labelId="city-select"
        id="city-select"
        value={city}
        label="지역1"
        onChange={handleCityChange}
        sx={selectStyle}
        IconComponent={() => <KeyboardArrowDownIcon sx={{ color: "white" }} />}
      >
        <MenuItem value="전체">전체</MenuItem>
        <MenuItem value="서울">서울</MenuItem>
        <MenuItem value="부산">부산</MenuItem>
        <MenuItem value="제주">제주</MenuItem>
      </Select>
      <InputLabel id="location-select"></InputLabel>
      <Select
        variant="outlined"
        labelId="location-select"
        id="location-select"
        value={location}
        label="지역2"
        onChange={handleLocationChange}
        disabled={!city}
        sx={selectStyle}
        IconComponent={() => <KeyboardArrowDownIcon sx={{ color: "white" }} />}
      >
        <MenuItem value="전체">전체</MenuItem>
        {renderLocationOptions()}
      </Select>
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

const labelStyle = {
  fontSize: "1.7rem",
  fontWeight: "600",
  color: "white",
};

const selectStyle = {
  width: "100",
  color: "white",
  border: "1px solid white",
};
