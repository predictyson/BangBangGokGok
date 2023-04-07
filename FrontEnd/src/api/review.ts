import { AxiosResponse } from "axios";
import { IPostData } from "types/detail";
import instance from "./api";
import { PutUserProfileParams, PutReviewResponse } from "types/mypage";

export async function getReviews(themeId: number) {
  return await instance.get(`/theme/${themeId}/reviews`);
}
export async function postReview(review: IPostData) {
  console.log(review);
  return await instance.post(`/review`, review);
}

// 리뷰 수정
export async function putReview(
  review: PutUserProfileParams
): Promise<AxiosResponse<PutReviewResponse>> {
  return await instance.put(`/review`, review);
}

// 리뷰 삭제
export async function deleteReview(reviewId: number) {
  return await instance.delete(`/review/${reviewId}`);
}
