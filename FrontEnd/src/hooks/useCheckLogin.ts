import { useLoaderData, useNavigate } from "react-router-dom";
import { CheckLoginUserResponse } from "types/auth";

/**
 * 마이페이지로 로그인이 되어있는지 확인하는 함수
 */
export const useCheckLogin = () => {
  const { isLoginUser } = useLoaderData() as CheckLoginUserResponse;
  console.log("isLoginUser", isLoginUser);
  const navigate = useNavigate();
  if (!isLoginUser) {
    navigate("/login");
    throw new Error("로그인이 필요한 페이지입니다.");
  }
};
