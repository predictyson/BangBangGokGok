export interface SearchParams {
  word: string;
  regionBig: string;
  regionSmall: string;
  genreId: number;
  difficultyS: DifficultyOption;
  difficultyE: DifficultyOption;
  people: PeopleOption;
  time: TimeOption; // 0 : 상관없음 || 1 : 60분 이하 || 2 : 60~90분 || 3 : 90분 이상
  pages: number;
  sortby: SortOption;
  orderby: SortOrder;
}

export type DifficultyOption = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type PeopleOption = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TimeOption = 0 | 1 | 2 | 3;

export type SortOption =
  | "userRating"
  | "userActivity"
  | "userFear"
  | "userDifficulty";

export type SortOrder = "asc" | "desc";

export interface PreviewThemeResponse {
  themeId: number; // 테마 id
  title: string; // 테마명
  imgUrl: string; // 테마 포스터 링크
  genres: string[]; // 테마 장르 목록
}
