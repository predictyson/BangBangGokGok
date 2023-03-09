import React from "react";
import Header from "@/components/common/Header";
import Banner from "@/components/main/Banner";
import RankSlider from "@components/main/RankSlider";
export default function MainPage() {
  return (
    <div>
      <Header />
      <Banner />
      <RankSlider />
    </div>
  );
}
