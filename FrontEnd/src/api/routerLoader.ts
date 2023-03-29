import { requestCheckLoginUser } from "@/api/auth";

export const myPageLoader = async () => {
  const userId = Number(localStorage.getItem("userId"));
  const response = await requestCheckLoginUser(userId);
  return response.data;
};
