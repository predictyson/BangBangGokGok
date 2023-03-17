import React from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { theme } from "@/styles/theme";

export default function LeftPorfile(props: ProfileProps) {
  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    console.log(target.name + " : " + target.value);
    props.changeUserInfo(target.name, target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    const target = e.target as HTMLInputElement;
    // console.log(target.name + " : " + target.value);
    props.changeUserInfo(target.name, target.value);
  };

  const handleToggleChange = (
    e: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      props.changeUserInfo("gender", newAlignment);
    }
  };

  return (
    <RightBox>
      <CustomTextField
        autoComplete="current-password"
        color="warning"
        name="nickname"
        focused
        sx={{ input: { color: "white" } }}
        value={props.userInfo.nickname}
        placeholder="닉네임을 입력하세요"
        onChange={handleInputChange}
        hiddenLabel
      />
      <SelectBox>
        <p>선호 방문 지역을 선택해주세요.</p>
        <CustomSelect
          onChange={handleSelectChange}
          value={props.userInfo.regionBig}
          name="regionBig"
          color="warning"
          displayEmpty
        >
          <MenuItem value="">
            <em>선택하세요</em>
          </MenuItem>
          <MenuItem value={1}>서울</MenuItem>
          <MenuItem value={2}>어디</MenuItem>
          <MenuItem value={3}>어디</MenuItem>
          <MenuItem value={4}>워디</MenuItem>
        </CustomSelect>
      </SelectBox>
      <SelectBox>
        <p>나이를 입력해주세요.</p>
        <CustomSelect
          value={props.userInfo.age}
          name="age"
          onChange={handleSelectChange}
          color="warning"
          displayEmpty
        >
          <MenuItem value={0}>
            <em>선택하세요</em>
          </MenuItem>
          <MenuItem value={10}>10대</MenuItem>
          <MenuItem value={20}>20대</MenuItem>
          <MenuItem value={30}>30대</MenuItem>
          <MenuItem value={40}>40대</MenuItem>
          <MenuItem value={50}>50대</MenuItem>
        </CustomSelect>
      </SelectBox>
      <SelectBox>
        <p>성별을 선택해주세요.</p>
        <ToggleButtonGroup
          value={props.userInfo.gender}
          exclusive
          onChange={handleToggleChange}
          aria-label="Platform"
        >
          <CustomToggleButton value="male">남</CustomToggleButton>
          <CustomToggleButton value="female">여</CustomToggleButton>
        </ToggleButtonGroup>
      </SelectBox>
    </RightBox>
  );
}

const RightBox = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5rem 0;
`;

const SelectBox = styled.div`
  font-size: 1.5rem;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-weight: ${theme.fontWeight.bold};
  }
`;

const CustomTextField = mstyled(TextField)({
  width: "80%",
  color: "white",
  input: {
    fontSize: "1.2rem",
  },
});

const CustomSelect = mstyled(Select)({
  width: "15rem",
  height: "4rem",
  fontSize: "1.2rem",
  border: "1px solid white",
  color: "white",

  svg: {
    color: "white",
  },
});

const CustomToggleButton = mstyled(ToggleButton)({
  height: "4rem",
  width: "4rem",
  fontSize: "1.5rem",
  borderRadius: "0.8rem",
  border: `solid 2px white`,
  fontFamily: "Pretendard",
  color: "white",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: `${theme.colors.pink}`,
    fontWeight: "bold",
  },
});
