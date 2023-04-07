import instance from "./api";
import axios from "axios";
const DJANGO_URL = import.meta.env.VITE_DJANGO_DOMAIN;

// 유효한 유저 등록
export const requestUser = async (keyword: string) => {
  return instance.get(`/groupset/user/${keyword}`);
};

// 그룹 테마 추천
export const themeRec = async (users: number[]) => {
  const data = {
    userIds: users,
  };
  return axios.post(`${DJANGO_URL}/groupset`, data);
};
