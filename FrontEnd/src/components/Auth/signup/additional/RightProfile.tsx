import React, { useState } from "react";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { theme } from "@/styles/theme";
import { ProfileProps } from "types/auth";
import { requestNickname, requestSmallRegion } from "@/api/auth";

export default function LeftPorfile(props: ProfileProps) {
  const [bigRegion, setBigRegion] = useState<string>("");
  const [smallRegion, setSmallRegion] = useState<string[]>([]);

  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    // console.log(target.name + " : " + target.value);
    // console.log(typeof target.value);
    if (target.name === "nickname" && String(target.value).length > 10) {
      props.handleToastClick("error", "닉네임은 2~10자 사이입니다.");
    } else {
      props.changeUserInfo(target.name, target.value);
    }
  };

  const handleSetSmallRegion = async (e: SelectChangeEvent<unknown>) => {
    const target = e.target as HTMLInputElement;
    // console.log(target.name + " : " + target.value);
    setBigRegion(target.value);
    props.changeUserInfo(target.name, target.value);
    try {
      const {
        data: { regionSmalls },
      } = await requestSmallRegion(target.value);
      setSmallRegion(regionSmalls);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectChange = async (e: SelectChangeEvent<unknown>) => {
    const target = e.target as HTMLInputElement;
    // console.log(target.name + " : " + target.value);
    setBigRegion(target.value);
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

  const nicknameValidCheck = async () => {
    const nickname = props.userAdditionalInfo.nickname;
    if (nickname === "") {
      props.handleToastClick("error", "닉네임을 입력하세요.");
      return;
    }
    try {
      const {
        data: { isDuplicated },
      } = await requestNickname(props.userAdditionalInfo.nickname);
      if (!isDuplicated) {
        props.handleToastClick("success", "사용 가능한 닉네임입니다.");
      } else {
        props.handleToastClick("error", "이미 사용중인 닉네임입니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RightBox>
      <SelectBox>
        <CustomTextField
          autoComplete="current-password"
          color="warning"
          name="nickname"
          focused
          sx={{ input: { color: "white" } }}
          value={props.userAdditionalInfo.nickname}
          placeholder="2~10글자 사이 닉네임을 입력하세요."
          onChange={handleInputChange}
          hiddenLabel
        />
        <ValidCheckButton onClick={nicknameValidCheck}>
          {" "}
          중복 체크{" "}
        </ValidCheckButton>
      </SelectBox>
      <SelectBox>
        <p>선호 방문 지역을 선택해주세요.</p>
        <CustomSelect
          onChange={handleSetSmallRegion}
          name="regionBig"
          color="warning"
          displayEmpty
          value={props.userAdditionalInfo.regionBig}
        >
          <MenuItem value="">
            <em>선택하세요</em>
          </MenuItem>
          <MenuItem value={"서울"}>서울</MenuItem>
          <MenuItem value={"경기"}>경기</MenuItem>
          <MenuItem value={"충청"}>충청</MenuItem>
          <MenuItem value={"전라"}>전라</MenuItem>
          <MenuItem value={"경상"}>경상</MenuItem>
          <MenuItem value={"강원"}>강원</MenuItem>
          <MenuItem value={"제주"}>제주</MenuItem>
        </CustomSelect>
        <CustomSelect
          onChange={handleSelectChange}
          name="regionSmall"
          color="warning"
          value={props.userAdditionalInfo.regionSmall}
          displayEmpty
        >
          <MenuItem value="">
            <em>선택하세요</em>
          </MenuItem>
          {smallRegion.map((region: string, idx: number) => (
            <MenuItem value={region} key={idx}>
              {region}
            </MenuItem>
          ))}
        </CustomSelect>
      </SelectBox>
      <SelectBox>
        <p>나이를 입력해주세요.</p>
        <CustomSelect
          value={props.userAdditionalInfo.age}
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
          value={props.userAdditionalInfo.gender}
          exclusive
          onChange={handleToggleChange}
          aria-label="Platform"
        >
          <CustomToggleButton value="M">남</CustomToggleButton>
          <CustomToggleButton value="W">여</CustomToggleButton>
        </ToggleButtonGroup>
      </SelectBox>
    </RightBox>
  );
}

const ValidCheckButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 5rem;
  border-radius: 0.5rem;
  font-size: 1.7rem;
  background-color: ${theme.colors.pink};
  cursor: pointer;
  margin-left: 1rem;
`;

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
  width: "11rem",
  height: "4rem",
  fontSize: "1.2rem",
  border: "1px solid white",
  color: "white",

  svg: {
    color: "white",
  },

  "&.MuiList-root.MuiList-padding.MuiMenu-list.css-6hp17o-MuiList-root-MuiMenu-list":
    {
      height: "5rem",
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
