import instance from "./api";
const URL = import.meta.env.VITE_SERVER_DOMAIN;

export async function postInterest(themeId: number) {
  return await instance.post(`${URL}/interest/${themeId}`);
}
export async function deleteInterest(themeId: number) {
  return await instance.delete(`${URL}/interest/${themeId}`);
}
