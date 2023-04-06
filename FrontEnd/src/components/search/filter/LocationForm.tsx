import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { getRegionSmall } from "@/api/others";
import { ReducerAction, FilterValue } from "types/search";

interface LocationFormProps {
  filterValue: FilterValue;
  handleFilterValueChange: (action: ReducerAction) => void;
}

const REGION_BIG_OPTIONS = [
  "전체", // 전체는 요청 못보냄
  "강원",
  "서울",
  "경기",
  "경상",
  "전라",
  "제주",
  "충청",
];

const LocationForm = (props: LocationFormProps) => {
  // 대지역 입력값
  const [regionBigInputValue, setRegionBigInputValue] = useState<string>(
    props.filterValue.regionBig
  );
  const handleBigInputValueChange = (event: SelectChangeEvent<unknown>) => {
    setRegionBigInputValue(event.target.value as string);
    props.handleFilterValueChange({
      type: "regionBig",
      newValue: {
        ...props.filterValue,
        regionBig: event.target.value as string,
      },
    });
    setRegionSmallInputValue("전체");
    props.handleFilterValueChange({
      type: "regionSmall",
      newValue: {
        ...props.filterValue,
        regionSmall: "전체",
      },
    });
  };

  // 소지역 입력값
  const [regionSmallInputValue, setRegionSmallInputValue] = useState<string>(
    props.filterValue.regionSmall
  );

  const handleSmallInputValueChange = (event: SelectChangeEvent<unknown>) => {
    setRegionSmallInputValue(event.target.value as string);
    props.handleFilterValueChange({
      type: "regionSmall",
      newValue: {
        ...props.filterValue,
        regionSmall: event.target.value as string,
      },
    });
  };

  // 소지역 옵션[]
  const [regionSmallOptions, setRegionSmallOptions] = useState<string[]>([]);

  // 소지역 옵션 렌더링
  const renderLocationOptions = () => {
    return regionSmallOptions.map((regionSmalloption) => (
      <MenuItem value={regionSmalloption} key={regionSmalloption}>
        {regionSmalloption}
      </MenuItem>
    ));
  };

  useEffect(() => {
    const requestRegionSmall = async () => {
      if (regionBigInputValue === "전체") {
        setRegionSmallOptions([]);
        return; // 전체일 때는 API 요청 안함
      }
      const response = await getRegionSmall(regionBigInputValue);
      setRegionSmallOptions(response.data.regionSmalls);
    };
    requestRegionSmall();
  }, [regionBigInputValue]);

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
          value={regionBigInputValue}
          color="warning"
          onChange={handleBigInputValueChange}
        >
          {REGION_BIG_OPTIONS.map((option) => (
            <CustomMenuItem value={option} key={option}>
              {option}
            </CustomMenuItem>
          ))}
        </CustomSelect>
        <CustomInputLabel id="location-select"></CustomInputLabel>
        <CustomSelect
          labelId="location-select"
          value={regionSmallInputValue}
          color="warning"
          onChange={handleSmallInputValueChange}
          disabled={!regionBigInputValue}
        >
          <CustomMenuItem value="전체">전체</CustomMenuItem>
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

const CustomInputLabel = mstyled(InputLabel)`
  font-size: 2.7rem;
  @media (max-width: 1536px) {
    font-size: 2.2rem;
  }
  font-weight: 600;
  color: white;
  margin-right: 1.5rem;
`;

const CustomSelect = mstyled(Select)`
  width: 11.5rem;
  height: 4rem;
  font-size: 2rem;
  @media (max-width: 1536px) {
    font-size: 1.7rem;
  }
  border: 1px solid white;
  color: white;
  svg {
    color: white;
  }
`;

const CustomMenuItem = mstyled(MenuItem)`
  font-size: 2rem;
  @media (max-width: 1536px) {
    font-size: 1.7rem;
  }
`;
