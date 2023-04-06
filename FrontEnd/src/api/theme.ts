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
// 테마 분리 API
export async function getRecommendTheme() {
  return await instance.get(`/theme/user/recommend`);
}

// export async function getDefaultUserTheme() {
//   return await instance.get(`/theme/user/default`);
// }

export async function getHotTheme() {
  return await instance.get(`/theme/common/hot`);
}

export async function getTopUserTheme() {
  return await instance.get(`/theme/user/feel-or-region`);
}

export async function getTopGuestFeelTheme() {
  return await instance.get(`/theme/guest/feel`);
}

export async function getTopGuestRegionTheme() {
  return await instance.get(`/theme/guest/region`);
}

export async function getAwardTheme() {
  return await instance.get(`/theme/common/award`);
}
