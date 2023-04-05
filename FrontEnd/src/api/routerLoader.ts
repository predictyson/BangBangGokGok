import { requestCheckLoginUser } from "@/api/auth";

export const myPageLoader = async () => {
  const userId = Number(localStorage.getItem("userId"));
  if (userId === 0 || localStorage.getItem("accessToken") === null)
    return false;

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
