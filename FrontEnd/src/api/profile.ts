import instance from "./api";
import { AxiosResponse } from "axios";
import {
  UserProfileReponse,
  UserReviewsResponse,
  UserPreferencesReponse,
  UserInterestsResponse,
  PostUserProfileParams,
} from "types/mypage";

// 회원 정보 조회
export const getUserProfile = async (
  userId: number
): Promise<AxiosResponse<UserProfileReponse>> => {
  return await instance.get(`/profile/info/${userId}`);
};

// 회원 리뷰 조회
export const getUserReviews = async (
  userId: number
): Promise<AxiosResponse<UserReviewsResponse>> => {
  return await instance.get(`/profile/reviews/${userId}`);
};

// 회원 장르 선호도 조회(차트)
export const getUserPreferences = async (
  userId: number
): Promise<AxiosResponse<UserPreferencesReponse>> => {
  return await instance.get(`/profile/preference/${userId}`);
};

// 회원 관심 테마 목록 조회
export const getUserInterests = async (
  userId: number
): Promise<AxiosResponse<UserInterestsResponse>> => {
  return await instance.get(`/profile/interestThemes/${userId}`);
};

// 회원 정보 수정
export const putUserProfile = async (
  newUserProfileData: PostUserProfileParams
) => {
  return await instance.put(`/profile`, newUserProfileData);
};

// 회원 탈퇴
export const deleteUserProfile = async () => {
  return await instance.delete(`/profile`);
};
