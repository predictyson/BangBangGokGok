import { requestCheckLoginUser } from "@/api/auth";

export const myPageLoader = async () => {
  const userId = Number(localStorage.getItem("userId"));
  try {
    const {
      data: { isLoginUser },
    } = await requestCheckLoginUser(userId);
    console.log(isLoginUser);
    if (!isLoginUser) return false;
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
};
