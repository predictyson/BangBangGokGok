import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { requestUserInfo } from "@/api/auth";

export default function RedirectOauth2() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  console.log("params", params);
  const accessToken = params.get("accessToken");
  const [cookies, setCookie] = useCookies(["refresh", "access"]);

  /**
   * SNS 로그인 후, JWT 토큰을 받아 cookie에 SET
   * 현재는 httpOnly를 사용하지 않아, 추후에 고도화 리팩토링 요망
   */
  const handleToken = () => {
    setCookie("access", accessToken, {
      path: "/",
      // httpOnly: true,
      secure: true,
    });
  };

  const handleUserInfo = async () => {
    try {
      const {
        data: {
          refreshToken,
          user: { userId, nickname, profileImageType, email },
        },
      } = await requestUserInfo();
      console.log(userId);
      setCookie("refresh", refreshToken, {
        path: "/",
        // httpOnly: true,
        secure: true,
      });
      localStorage.setItem("userId", userId);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profileImageType", profileImageType);
      localStorage.setItem("email", email);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleToken();
    handleUserInfo();
  }, []);
  return <CircularProgress />;
}
