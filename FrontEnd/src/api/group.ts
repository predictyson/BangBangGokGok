import instance from "./api";

// 그룹 테마 추천
export const themeRec = async (userIds: string[]) => {
  return instance.post(`/rec/groupset`, userIds);
};
