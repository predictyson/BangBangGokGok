import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { getRegionSmall } from "@/api/others";

interface LocationFormProps {
  regionBig: string;
  regionSmall: string;
}

const REGION_BIG_OPTIONS = [
  "전체",
  "강원",
  "서울",
  "경기/인천",
  "경상",
  "전라",
  "제주",
  "충청",
];

const LocationForm = (props: LocationFormProps) => {
  // TODO: useEffect로 regionBig, regionSmall을 받아와서 선택지를 뿌려줘야 함.
  const [regionSmallOptions, setRegionSmallOptions] = useState<string[]>([
    "전체",
  ]);

  // const handleCityChange = (event: SelectChangeEvent<unknown>) => {
  //   setCity(event.target.value as string);
  //   setLocation("전체");
  // };

  // const handleLocationChange = (event: SelectChangeEvent<unknown>) => {
  //   setLocation(event.target.value as string);
  // };

  const renderLocationOptions = () => {
    return regionSmallOptions.map((regionSmalloption) => (
      <MenuItem value={regionSmalloption} key={regionSmalloption}>
        {regionSmalloption}
      </MenuItem>
    ));
  };

  console.log(props.regionSmall);

  useEffect(() => {
    const requestRegionSmall = async () => {
      const reponse = await getRegionSmall(props.regionBig);
      console.log(reponse.data);
      setRegionSmallOptions(reponse.data);
    };
    requestRegionSmall();
  }, [props.regionBig]);

  return (
    <Wrapper>
      <div style={{ flexBasis: "15%" }}>
        <CustomInputLabel id="city-select">지역</CustomInputLabel>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexBasis: "85%",
        }}
      >
        <CustomSelect
          labelId="city-select"
          value={props.regionBig}
          color="warning"
          // onChange={handleCityChange}
        >
          {REGION_BIG_OPTIONS.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomInputLabel id="location-select"></CustomInputLabel>
        <CustomSelect
          labelId="location-select"
          value={props.regionSmall}
          color="warning"
          // onChange={handleLocationChange}
          disabled={!props.regionBig}
        >
          {renderLocationOptions()}
        </CustomSelect>
      </div>
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
  width: "11.5rem",
  height: "4rem",
  fontSize: "1.2rem",
  border: "1px solid white",
  color: "white",
  svg: {
    color: "white",
  },
});
