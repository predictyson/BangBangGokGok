import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function RedirectSignUp() {
  const navigate = useNavigate();
  // 현재 페이지의 URL에서 fragment identifier 값을 가져옴
  const fragment = window.location.hash.substring(1);

  const userId = fragment.split("&")[0].split("=")[1];

  // accessToken 값을 출력
  console.log(userId);

  useEffect(() => {
    navigate("/additional", { state: { userId: userId } });
  }, []);

  return <CircularProgress />;
}
