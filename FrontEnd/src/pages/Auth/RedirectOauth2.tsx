import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { requestUserInfo } from "@/api/auth";

export default function RedirectOauth2() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const accessToken = String(params.get("accessToken"));

  /**
   * SNS 로그인 후, JWT 토큰을 받아 cookie에 SET
   * 현재는 httpOnly를 사용하지 않아, 추후에 고도화 리팩토링 요망
   */
  const handleToken = () => {
    localStorage.setItem("accessToken", accessToken);
  };

  const handleUserInfo = async () => {
    try {
      const {
        data: {
          user: { userId, nickname, profileImageType, email },
        },
      } = await requestUserInfo();
      localStorage.setItem("userId", userId);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profileImageType", profileImageType);
      localStorage.setItem("email", email);
      navigate("/", { replace: true });
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
