import instance from "./api";
const URL = import.meta.env.VITE_SERVER_DOMAIN;

export async function getReviews(themeId: number) {
  return await instance.get(`${URL}/review/${themeId}`);
}
export async function postReview() {
  return await instance.post(`${URL}/review`);
}
