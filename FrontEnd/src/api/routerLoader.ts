import { requestCheckLoginUser } from "@/api/auth";

export const myPageLoader = async () => {
  const userId = Number(localStorage.getItem("userId"));
  const response = await requestCheckLoginUser(userId);
  console.log(response.data);
  return response.data.isLoginUser;
};
