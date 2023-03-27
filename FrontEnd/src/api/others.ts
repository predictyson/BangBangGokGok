import instance from "./api";
import { AxiosResponse } from "axios";

interface RegionSmallResponse {
  regionSmalls: string[];
}

interface GenresReponse {
  genres: GenreResponse[];
}

export interface GenreResponse {
  category: string;
  genreId: number;
}

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
