export interface SearchParams {
  word: string;
  regionBig: string;
  regionSmall: string;
  genreId: number;
  difficultyS: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  difficultyE: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  people: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  time: 0 | 1 | 2 | 3; // 0 : 상관없음 || 1 : 60분 이하 || 2 : 60~90분 || 3 : 90분 이상
  pages: number;
  sortby: "userRating" | "userActivity" | "userFear" | "userDifficulty";
  orderby: "asc" | "desc";
}

export interface PreviewThemeResponse {
  themeId: number; // 테마 id
  title: string; // 테마명
  imgUrl: string; // 테마 포스터 링크
  genres: string[]; // 테마 장르 목록
}
