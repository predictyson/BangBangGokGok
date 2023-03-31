export interface ProfileLoader {
  profileInfo: UserProfile;
  preferences: UserPreference[];
}

export interface UserProfileReponse {
  isMe: boolean;
  userInfo: UserProfile;
}

export interface UserProfile {
  id: number;
  nickname: string;
  regionBig: string;
  regionSmall: string;
  age: number;
  gender: string;
  profileImageType: string;
  genres: string[];
}

export interface UserReviewsResponse {
  isMe: boolean;
  reviews: UserReview[];
}

export interface UserReview {
  reviewId: number;
  content: string;
  userRating: number;
  userActivity: number;
  userFear: number;
  userDifficulty: number;
  createTime: Date;
  isSuccess: number;
  previewThemeResponse: Theme;
}

export interface Theme {
  themeId: number;
  title: string;
  imgUrl: string;
  genres: string[];
}

export interface UserPreferencesReponse {
  isMe: boolean;
  preference: UserPreference[];
}

export interface UserPreference {
  genre: string;
  count: number;
}

export interface UserInterestsResponse {
  isMe: boolean;
  interestThemes: UserInterestTheme[];
}

export interface UserInterestTheme {
  interestedThemeOfUserId: number;
  previewThemeResponse: PreviewThemeResponse;
}

export interface PreviewThemeResponse {
  themeId: number;
  title: string;
  imgUrl: string;
  genres: string[];
}

export interface PostUserProfileParams {
  userId: number;
  nickname: string;
  region: string;
  age: number;
  gender: string;
  profileImageType: string;
  genreIdAdd: number[];
  genreIdDel: number[];
}

export interface PutUserProfileParams {
  reviewId: number; // 리뷰 id
  content: string; // 리뷰 내용
  userRating: number; // 평점
  userActivity: number; // 체감 활동성
  userFear: number; // 체감 공포도
  userDifficulty: number; // 체감 난이도
  isSuccess: number; // 성공 여부 (0:실패, 1:성공)
}

// 리뷰 수정
export interface PutReviewResponse {
  reviewId: number; // 리뷰 id
  content: string; // 리뷰 내용
  userRating: number; // 평점
  userActivity: number; // 체감 활동성
  userFear: number; // 체감 공포도
  userDifficulty: number; // 체감 난이도
  createTime: Date; // 생성 날짜
  isSuccess: number; // 성공 여부

  theme: PreviewThemeResponse; // 테마 정보
}
