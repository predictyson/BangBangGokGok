import instance from "./api";
import { AxiosResponse } from "axios";
import { RegionSmallResponse, GenresReponse } from "types/search";

// 지역 소분류 목록 조회
export async function getRegionSmall(
  regionBig: string
): Promise<AxiosResponse<RegionSmallResponse>> {
  return await instance.get(`/other/region/${regionBig}`);
}

// 장르 목록 조회
export async function getGenres(): Promise<AxiosResponse<GenresReponse>> {
  return await instance.get(`/other/genre`);
}
