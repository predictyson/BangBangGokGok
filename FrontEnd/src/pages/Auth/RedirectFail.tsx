import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export default function RedirectFail() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const errorMessage = String(params.get("error"));
  console.log("파람", params);
  console.log("에러 메세지", errorMessage);

  useEffect(() => {
    alert({ errorMessage });
    navigate("/login");
  }, []);
  return <CircularProgress />;
}
