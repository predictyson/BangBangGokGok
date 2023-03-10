import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/Auth/SingUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import MainPage from "@/pages/MainPage";
import GroupSetPage from "@/pages/GroupSetPage";
import SearchPage from "@/pages/SearchPage";
import FindPassword from "@/pages/Auth/FindPasswordPage";
import AdditionalPage from "./pages/Auth/AdditionalPage";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/main", element: <MainPage /> },
  { path: "/groupset", element: <GroupSetPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/findpassword", element: <FindPassword /> },
  { path: "/additional", element: <AdditionalPage /> },
]);

export default router;
