import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function RedirectSignUp() {
  const navigate = useNavigate();
  // 현재 페이지의 URL에서 query parameter 값을 가져옴
  const queryString = window.location.search;
  const fragment = window.location.hash.substring(1);
  console.log("queryString", queryString);
  console.log("fragment", fragment);
  // query parameter 값에서 userId 부분만 추출
  const userId = queryString.split("=")[1];

  // accessToken 값을 출력
  console.log(userId);

  useEffect(() => {
    // navigate("/additional", { state: { userId: userId } });
  }, []);

  return <CircularProgress />;
}
