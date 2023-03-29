import { IPostData } from "types/detail";
import instance from "./api";

export async function getReviews(themeId: number) {
  return await instance.get(`/theme/${themeId}/reviews`);
}
export async function postReview(review: IPostData) {
  console.log(review);
  return await instance.post(`/review`, review);
}
