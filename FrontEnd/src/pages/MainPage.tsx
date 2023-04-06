import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Banner from "@/components/main/Banner";
import RankSlider from "@components/main/Slider/RankSlider";
import BasicSlider from "@components/main/Slider/Slider";
import AwardsSlider from "@components/main/Slider/AwardsSlider";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import {
  IAwardSlider,
  ISliderData,
  IAwardTheme,
  IThemeData,
} from "types/slider";
import {
  getThemeUser,
  getThemeGuest,
  getRecommendTheme,
  getDefaultUserTheme,
} from "@/api/theme";
import Footer from "@components/common/Footer";

export default function MainPage() {
  const [hotData, setHotData] = useState<IThemeData[]>(HotThemesData);
  const [topData, setTopData] = useState<ISliderData[]>(TopThemesData);
  const [awardData, setAwardData] = useState<IAwardSlider>(AwardThemesData);
  const [recommendData, setRecommendData] =
    useState<ISliderData[]>(RecommendThemesData);
  const isLogin = localStorage.getItem("userId") !== null ? true : false;
  const requestRecommendTheme = async () => {
    try {
      const res = await getRecommendTheme();
      console.log(res.data.recommendThemes);
      setRecommendData(res.data.recommendThemes);
      console.log(recommendData);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  };

  const requestThemeUser = async () => {
    try {
      const res = await getDefaultUserTheme();
      const { hotThemes, topThemes, awardThemes } = res.data;
      console.log(res.data);
      setHotData(hotThemes);
      setTopData(topThemes);
      setAwardData(awardThemes);
    } catch (err) {
      throw new Error("Internal Server Error ");
    }
  };
  const requestThemeGuest = async () => {
    try {
      const res = await getThemeGuest();
      setHotData(res.data.hotThemes);
      setTopData(res.data.topThemes);
      setAwardData(res.data.awardThemes);
      console.log(res.data.hotThemes);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  };

  useEffect(() => {
    isLogin && requestRecommendTheme();
    isLogin && requestThemeUser();
    !isLogin && requestThemeGuest();
  }, []);

  return (
    <Container>
      <Header />
      <div className="box">
        {!isLogin && <Banner />}
        {isLogin && (
          <RecommendWrapper>
            <BasicSlider isRecommendSlider={true} topData={recommendData} />
          </RecommendWrapper>
        )}
        <RankSlider data={hotData} />
        <BasicSlider isRecommendSlider={false} topData={topData} />
        <AwardsSlider awardData={awardData} />
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  background: ${theme.colors.background};
  /* background: linear-gradient(
    136.16deg,
    ${theme.colors.background} 35%,
    rgb(146, 89, 124) 65%
  ); */
  .box {
    overflow-y: scroll;
    height: calc(100vh - 7rem);
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
    }
  }
`;

const RecommendWrapper = styled.div`
  width: 90%;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  border: solid 1px ${theme.colors.pink};
  padding-bottom: 3rem;
`;

// api에서 가져올 데이터 (DUMMY)
const HotThemesData: IThemeData[] = [
  {
    themeId: 0,
    title: "",
    imgUrl:
      "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/hotTheme.png",
  },
  {
    themeId: 0,
    title: "",
    imgUrl:
      "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/hotTheme.png",
  },
  {
    themeId: 0,
    title: "",
    imgUrl:
      "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/hotTheme.png",
  },
  {
    themeId: 0,
    title: "",
    imgUrl:
      "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/hotTheme.png",
  },
  {
    themeId: 0,
    title: "",
    imgUrl:
      "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/hotTheme.png",
  },
  {
    themeId: 0,
    title: "",
    imgUrl:
      "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/hotTheme.png",
  },
  {
    themeId: 0,
    title: "",
    imgUrl:
      "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/hotTheme.png",
  },
  {
    themeId: 0,
    title: "",
    imgUrl:
      "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/hotTheme.png",
  },
];

const TopThemesData: ISliderData[] = [
  {
    label: "지역 별 인기 테마",
    themes: [
      {
        themeId: 1,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 2,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 3,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 4,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 5,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 6,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 7,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 8,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
    ],
  },
  {
    label: "유저들이 느낀 난이도 최고 테마 ",
    themes: [
      {
        themeId: 1,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 2,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 3,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 4,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 5,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 6,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 7,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 8,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
    ],
  },
];

const AwardThemeDummy: IAwardTheme[] = [
  {
    awardName: "올해의 테마", // 수상 부문
    themeId: 1, // 테마 id
    title: "", // 테마명
    imgUrl: "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/award.png", // 테마 포스터 링크
  },
  {
    awardName: "공포/스릴러", // 수상 부문
    themeId: 1, // 테마 id
    title: "", // 테마명
    imgUrl: "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/award.png", // 테마 포스터 링크
  },
  {
    awardName: "감성/드라마", // 수상 부문
    themeId: 1, // 테마 id
    title: "", // 테마명
    imgUrl: "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/award.png", // 테마 포스터 링크
  },
  {
    awardName: "추리/미스터리", // 수상 부문
    themeId: 1, // 테마 id
    title: "", // 테마명
    imgUrl: "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/award.png", // 테마 포스터 링크
  },
  {
    awardName: "액션/어드벤처", // 수상 부문
    themeId: 1, // 테마 id
    title: "", // 테마명
    imgUrl: "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/award.png", // 테마 포스터 링크
  },
  {
    awardName: "SF/판타지", // 수상 부문
    themeId: 1, // 테마 id
    title: "", // 테마명
    imgUrl: "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/award.png", // 테마 포스터 링크
  },
  {
    awardName: "코믹/문제/기타", // 수상 부문
    themeId: 1, // 테마 id
    title: "", // 테마명
    imgUrl: "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/award.png", // 테마 포스터 링크
  },
  {
    awardName: "최고의 문제방", // 수상 부문
    themeId: 1, // 테마 id
    title: "", // 테마명
    imgUrl: "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/award.png", // 테마 포스터 링크
  },
];
const AwardThemesData: IAwardSlider = {
  year: 2019,
  theme: AwardThemeDummy,
};
const RecommendThemesData: ISliderData[] = [
  {
    label: "님을 위한 방탈출 테마 추천",
    themes: [
      {
        themeId: 1,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 2,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 3,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 4,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 5,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 6,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 7,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
      {
        themeId: 8,
        title: "",
        imgUrl:
          "https://bangbanggokgok.s3.ap-northeast-2.amazonaws.com/basic.png",
      },
    ],
  },
];
