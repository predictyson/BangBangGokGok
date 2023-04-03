import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function RedirectSignUp() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  console.log("params", params);
  const userId = params.get("userId");
  console.log("userId", userId);

  useEffect(() => {
    navigate("/additional", { state: { userId: userId } });
  }, []);

  return <CircularProgress />;
}
