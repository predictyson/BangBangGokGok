import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/Auth/SingUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import MainPage from "@/pages/MainPage";
import GroupSetPage from "@/pages/GroupSetPage";
import SearchPage from "@/pages/SearchPage";
import FindPassword from "@/pages/Auth/FindPasswordPage";
import AdditionalPage from "./pages/Auth/AdditionalPage";
import MyPage from "./pages/MyPage";
import ProfileInfoSection from "./pages/MyPage/ProfileInfoSection";
import MyReviesSection from "./pages/MyPage/MyReviewsSection";
import LikeThemesSection from "./pages/MyPage/LikeThemesSection";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/main", element: <MainPage /> },
  { path: "/groupset", element: <GroupSetPage /> },
  { path: "search", element: <SearchPage /> },
  { path: "/findpassword", element: <FindPassword /> },
  { path: "/additional", element: <AdditionalPage /> },
  {
    path: "mypage",
    element: <MyPage />,
    children: [
      { path: "", element: <ProfileInfoSection />, index: true },
      { path: "reviews", element: <MyReviesSection /> },
      { path: "likes", element: <LikeThemesSection /> },
    ],
  },
]);

export default router;
