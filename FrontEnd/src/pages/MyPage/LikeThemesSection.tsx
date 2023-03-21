import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function LikeThemesSection() {
  const [dummyLikes, setDummyLikes] = useState([
    { id: 1, title: "Result 1" },
    { id: 2, title: "Result 2" },
    { id: 3, title: "Result 3" },
    { id: 4, title: "Result 4" },
    { id: 5, title: "Result 5" },
    { id: 6, title: "Result 6" },
    { id: 7, title: "Result 7" },
    { id: 8, title: "Result 8" },
    { id: 9, title: "Result 9" },
    { id: 10, title: "Result 10" },
    { id: 11, title: "Result 11" },
    { id: 12, title: "Result 12" },
    { id: 13, title: "Result 13" },
    { id: 14, title: "Result 14" },
  ]);

  return (
    <SectionWrapper>
      <SectionTitle>Likes List</SectionTitle>
      <SectionContentWrapper>
        <OverflowWrapper>
          {dummyLikes.map((like) => (
            <ThemeItem key={like.id}>{like.title}</ThemeItem>
          ))}
        </OverflowWrapper>
      </SectionContentWrapper>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const SectionTitle = styled.h1`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
`;

const SectionContentWrapper = styled.div`
  border-radius: 1.5rem;
  height: 91%;
  @media (max-height: 800px) {
    height: 87%;
  }
  padding: 1.5rem;
  background-color: ${theme.colors.containerLight};
`;

const OverflowWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1.5rem;
  border-radius: 1.5rem;
  height: 100%;
`;

const ThemeItem = styled.div`
  border-radius: 1rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  width: 15rem;
  height: 20rem;
  background-color: #3e2133;
`;
