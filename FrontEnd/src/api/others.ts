import instance from "./api";
import { AxiosResponse } from "axios";

// 지역 소분류 목록 조회
export async function getRegionSmall(
  regionBig: string
): Promise<AxiosResponse<string[]>> {
  return await instance.get(`/region/small`, { params: { regionBig } });
}
