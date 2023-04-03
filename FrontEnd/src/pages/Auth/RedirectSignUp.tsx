import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function RedirectSignUp() {
  const navigate = useNavigate();
  // const fragment = window.location.hash.substring(1);
  // const userId = fragment.split("&")[0].split("=")[1];
  const params = new URLSearchParams(window.location.search);
  console.log("params", params);
  const userId = params.get("userId");

  // accessToken 값을 출력
  console.log(userId);

  useEffect(() => {
    navigate("/additional", { state: { userId: userId } });
  }, []);

  return <CircularProgress />;
}
