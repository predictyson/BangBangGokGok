import { requestCheckLoginUser } from "@/api/auth";

export const myPageLoader = async () => {
  const userId = Number(localStorage.getItem("userId"));
  const {
    data: { isLoginUser },
  } = await requestCheckLoginUser(userId);
  console.log(isLoginUser);
  return isLoginUser;
};
