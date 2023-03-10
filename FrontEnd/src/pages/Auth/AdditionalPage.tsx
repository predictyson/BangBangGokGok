import React, { useState } from "react";
import GenreSection from "@/components/Auth/GenreSection";

export default function AdditionalPage() {
  const [chapter, setChapter] = useState<string>("genre");

  return (
    <>
      <GenreSection />
    </>
  );
}
