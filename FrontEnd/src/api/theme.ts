import instance from "./api";
import { AxiosResponse } from "axios";
import { SearchParams, SearchResponse } from "types/search";

export async function getThemeUser() {
  return await instance.get(`/theme/user`);
}
export async function getThemeGuest() {
  return await instance.get(`/theme/guest`);
}
export async function getThemeAward() {
  return await instance.get(`/theme/award`);
}

export async function getSearchThemes(
  searchParams: SearchParams
): Promise<AxiosResponse<SearchResponse>> {
  return await instance.get(`/theme/search`, { params: searchParams });
}

export async function getDetail(themeId: number) {
  return await instance.get(`/theme/${themeId}`);
}
export async function getDetailLogin(themeId: number) {
  return await instance.get(`/theme/${themeId}/user`);
}

export async function getRecommendTheme() {
  return await instance.get(`/theme/user/recommend`);
}

export async function getDefaultUserTheme() {
  return await instance.get(`/theme/user/default`);
}
