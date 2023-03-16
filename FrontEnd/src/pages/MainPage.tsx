import React, { useState } from "react";
import Header from "@/components/common/Header";
import Banner from "@/components/main/Banner";
import RankSlider from "@components/main/RankSlider";
import BasicSlider from "@components/main/Slider";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Container from "@mui/material/Container";

export default function MainPage() {
  const [hotData, setHotData] = useState<ISliderData[]>(HotThemesData);
  const [topData, setTopData] = useState<ISliderData[]>(TopThemesData);
  const [awardData, setAwardData] = useState<ISliderData[]>(AwardThemesData);
  const [recommendData, setRecommendData] =
    useState<ISliderData[]>(RecommendThemesData);

  const isLogin = false;

  const data = topData.concat(awardData);
  return (
    <Container1>
      <Header />
      {!isLogin ? (
        <Banner />
      ) : (
        <RecommendWrapper>
          <BasicSlider isRecommendSlider={true} data={recommendData} />
        </RecommendWrapper>
      )}
      <RankSlider data={hotData} />
      <BasicSlider isRecommendSlider={false} data={data} />
    </Container1>
  );
}

const Container1 = styled.div`
  background: linear-gradient(
    136.16deg,
    ${theme.colors.background} 20.91%,
    ${theme.colors.containerLight} 80%
  );
`;

const RecommendWrapper = styled.div`
  width: 90%;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
  margin: auto auto;
  display: flex;
  flex-direction: column;
  border: solid 1px ${theme.colors.pink};
  padding-bottom: 3rem;
`;
// api에서 가져올 데이터 (DUMMY)
const HotThemesData: ISliderData[] = [
  {
    label: "🔥   이번주 Hot한 테마",
    themes: [
      {
        themeId: 1,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 2,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 3,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 4,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 5,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 6,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 7,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 8,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
    ],
  },
];

const TopThemesData: ISliderData[] = [
  {
    label: "지역 별 인기 테마",
    themes: [
      {
        themeId: 1,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 2,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 3,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 4,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 5,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 6,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 7,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 8,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
    ],
  },
  {
    label: "유저들이 느낀 난이도 최고 테마 ",
    themes: [
      {
        themeId: 1,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 2,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 3,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 4,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 5,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 6,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 7,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 8,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
    ],
  },
];
const AwardThemesData: ISliderData[] = [
  {
    label: "방탈출 어워즈 선정 테마 ",
    themes: [
      {
        themeId: 1,
        title: "VIRUS",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 2,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 3,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 4,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 5,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 6,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 7,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 8,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
    ],
  },
];

const RecommendThemesData: ISliderData[] = [
  {
    label: "GG님을 위한 방탈출 테마 추천",
    themes: [
      {
        themeId: 1,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 2,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 3,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 4,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 5,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 6,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 7,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 8,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
    ],
  },
  {
    label: "GG님과 비슷한 유저들이 방문한 테마 추천",
    themes: [
      {
        themeId: 1,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 2,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 3,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 4,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 5,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 6,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 7,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
      {
        themeId: 8,
        title: "virus",
        imgUrl:
          "https://user-images.githubusercontent.com/55784772/224228582-191f008f-7cee-43c4-83c2-9bbab1512955.png",
      },
    ],
  },
];
