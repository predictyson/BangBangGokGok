export interface ISliderData {
  label: string;
  themes: IThemeData[];
}
export interface IThemeData {
  themeId: number;
  title: string;
  imgUrl: string;
}

export interface IAwardSlider {
  year: number; // 어워즈 연도 (2022, 2021, 2020, 2019)
  theme: IAwardTheme[]; // 수상 테마 목록
}

export interface IAwardTheme {
  awardName: string; // 수상 부문
  themeId: number; // 테마 id
  title: string; // 테마명
  imgUrl: string; // 테마 포스터 링크
}
