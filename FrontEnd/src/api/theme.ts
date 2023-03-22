import instance from "./api";
const URL = import.meta.env.VITE_SERVER_DOMAIN;

export async function getThemeUser() {
  return await instance.get(`${URL}/theme/user`);
}
export async function getThemeGuest() {
  return await instance.get(`${URL}/theme/guest`);
}

export async function getThemeAward() {
  return await instance.get(`${URL}/theme/award`);
}
export async function getDetail(themeId: number) {
  return await instance.get(`${URL}/theme/${themeId}`);
}
