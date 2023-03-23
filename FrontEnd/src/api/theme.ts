import instance from "./api";
import { SearchParams } from "types/search";

export async function getThemeUser() {
  return await instance.get(`/theme/user`);
}
export async function getThemeGuest() {
  return await instance.get(`/theme/guest`);
}
export async function getThemeAward() {
  return await instance.get(`/theme/award`);
}

export async function getSearchThemes(searchParams: SearchParams) {
  return await instance.get(`/theme/search`, { params: searchParams });
}

export async function getDetail(themeId: number) {
  return await instance.get(`/theme/${themeId}`);
}
