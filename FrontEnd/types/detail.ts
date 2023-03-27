export interface IReviewData {
  user: IUserData;
  reviewId: number; // 리뷰 id
  content: string; // 리뷰 내용
  userRating: number; // 평점
  userActivity: number; // 활동성
  userFear: number; // 공포도
  userDifficulty: number; // 체감 난이도
  createTime: string; // 생성 날짜
  isSuccess: number; // 성공 여부
  record: string; // 남은 시간 기록
}
export interface IPostData {
  themeId: number; // 테마 id
  content: string; // 리뷰 내용
  userRating: number; // 평점
  userActivity: number; // 활동성
  userFear: number; // 공포도
  userDifficulty: number; // 체감 난이도
  isSuccess: number; // 성공 여부 (0:실패, 1:성공)
}
export interface IDetailData {
  themeId: number; // 테마 id
  regionBig: string; // 지역(대분류)
  regionSmall: string; // 지역(소분류)
  storeName: string; // 매장명
  title: string; // 테마명
  genre: string[]; // 장르 목록
  difficulty: number; // 난이도
  runningTime: number; // 시간
  openDate: string; // 오픈일
  minPeople: number; // 최소 인원
  maxPeople: number; // 최대 인원
  imgUrl: string; // 테마 포스터 링크
  pageUrl: string; // 테마 예약페이지 링크
  synopsis: string; // 테마 시놉시스
  userRating: number; // 평점
  userActivity: number; // 활동성
  userFear: number; // 공포도
  userDifficulty: number; // 체감 난이도
  userCnt: number; // 평가 인원
  isInterested: boolean;
}
