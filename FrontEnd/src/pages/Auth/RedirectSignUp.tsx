import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function RedirectSignUp() {
  const navigate = useNavigate();
  const userId = window.location.pathname.substring(7);
  console.log(userId);

  useEffect(() => {
    navigate("/additional", { state: { userId: userId } });
  }, []);

  return <CircularProgress />;
}
