export interface SearchParams {
  word: string;
  regionBig: string;
  regionSmall: string;
  genreId: number;
  difficultyS: DifficultyOption;
  difficultyE: DifficultyOption;
  people: PeopleOption;
  time: TimeOption;
  pages: number;
  sortby: SortOption;
  orderby: SortOrder;
}

export type DifficultyOption = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type PeopleOption = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TimeOption = 0 | 1 | 2;

export type SortOption =
  | "userRating"
  | "userActivity"
  | "userFear"
  | "userDifficulty";

export type ReducerAction = {
  type:
    | "regionBig"
    | "regionSmall"
    | "genreId"
    | "difficultyS"
    | "difficultyE"
    | "people"
    | "time";
  newValue: FilterValue;
};

export interface FilterValue {
  regionBig: string;
  regionSmall: string;
  genreId: number;
  difficultyS: DifficultyOption;
  difficultyE: DifficultyOption;
  people: PeopleOption;
  time: TimeOption;
}

export type SortOrder = "asc" | "desc";

export interface RegionSmallResponse {
  regionSmalls: string[];
}

export interface GenresReponse {
  genres: GenreResponse[];
}

export interface GenreResponse {
  category: string;
  genreId: number;
}

export interface SearchResponse {
  themes: PreviewThemeResponse[];
}

export interface PreviewThemeResponse {
  themeId: number; // 테마 id
  title: string; // 테마명
  imgUrl: string; // 테마 포스터 링크
  genres: string[]; // 테마 장르 목록
}
