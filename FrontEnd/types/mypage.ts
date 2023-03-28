export interface UserProfileReponse {
  isMe: boolean;
  userInfo: UserProfile;
}

export interface UserProfile {
  userId: number;
  nickname: string;
  regionBig: string;
  regionSmall: string;
  age: number;
  gender: string;
  profileImageType: string;
  genre: IGenreData[];
}

export interface UserProfileProps {
  userProfile: UserProfile;
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
  theme: Theme;
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
  interestId: number;
  theme: PreviewThemeResponse;
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
