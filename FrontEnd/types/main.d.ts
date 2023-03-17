interface dummy {
  num: number;
}
interface ISliderData {
  label: string;
  themes: IThemeData[];
}
interface IThemeData {
  themeId: int;
  title: stirng;
  imgUrl: string;
}

interface IToastProps {
  type: "success" | "error" | "info" | "action";
  message?: string;
}

interface GroupSetUer {
  profileImageType: string;
  nickname: string;
  email: string;
}

interface IDetailData {
  themeId: int; // 테마 id
  regionBig: string; // 지역(대분류)
  regionSmall: string; // 지역(소분류)
  storeName: string; // 매장명
  title: string; // 테마명
  genre: IGenreData[]; // 장르 목록
  difficulty: float; // 난이도
  runningTime: int; // 시간
  openDate: string; // 오픈일
  minPeople: int; // 최소 인원
  maxPeople: int; // 최대 인원
  imgUrl: string; // 테마 포스터 링크
  pageUrl: string; // 테마 예약페이지 링크
  synopsis: string; // 테마 시놉시스
  userRating: double; // 평점
  userActivity: double; // 활동성
  userFear: double; // 공포도
  userDifficulty: double; // 체감 난이도
  userCnt: int; // 평가 인원
  reviews: IReviewData[]; // 해당 테마의 리뷰들
  isInterested: boolean;
}

interface IGenreData {
  genreId: int; // 장르 id
  category: string; // 장르 종류
}

interface IReviewData {
  reviewId: int; // 리뷰 id
  content: string; // 리뷰 내용
  rating: double; // 평점
  activity: double; // 활동성
  fear: double; // 공포도
  difficulty: double; // 체감 난이도
  createTime: localDateTime; // 생성 날짜
  isSuccess: int; // 성공 여부
  record: float; // 남은 시간 기록

  theme: PreviewThemeData; // 테마 정보
}

interface IPreviewThemeData {
  themeId: int; // 테마 id
  title: string; // 테마명
  imgUrl: string; // 테마 포스터 링크
  genres: string[]; // 테마 장르 목록
}
