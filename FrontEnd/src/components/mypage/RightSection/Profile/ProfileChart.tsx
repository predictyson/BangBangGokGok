import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import BarChart from "@/components/main/Chart";
import DoughnutChart from "@/components/main/Chart";
import { UserPreference } from "types/mypage";

interface IBarData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

interface ProfileChartProps {
  preferences: UserPreference[];
}

export default function ProfileChart({ preferences }: ProfileChartProps) {
  const preferencesKeyArray = preferences.map((preference) => preference.genre);
  const preferencesValueArray = preferences.map(
    (preference) => preference.count
  );

  const BARDATA: IBarData = {
    labels: preferencesKeyArray,
    datasets: [
      {
        label: "유저 장르 선호도",
        data: preferencesValueArray,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <ChartWrapper>
      <BarChart data={BARDATA}></BarChart>
    </ChartWrapper>
  );
}

// const DUMMY_DATA = [
//   1, 20, 3, 4, 50, 6, 7, 0, 30, 11, 1, 13, 14, 50, 0, 0, 18, 6, 20, 90,
// ];

// const GENRE_LIST = [
//   "감성",
//   "공포",
//   "동화",
//   "드라마",
//   "로맨스",
//   "모험",
//   "미스터리",
//   "범죄",
//   "스릴러",
//   "아케이드",
//   "액션",
//   "에로",
//   "역사",
//   "잠입/탈출",
//   "추리",
//   "코미디",
//   "판타지",
//   "?",
//   "SF",
//   "기타",
// ];

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 1rem 2rem;
  height: 100%;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;
