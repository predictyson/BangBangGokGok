import React from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function SearchResult() {
  return (
    <Wrapper>
      <Container>
        {[
          ...dummySearchResults.slice(
            0,
            Math.floor(dummySearchResults.length / 2)
          ),
        ].map((result) => (
          <ThemeItem key={result.id}>{result.title}</ThemeItem>
        ))}
      </Container>
      <Container>
        {[
          ...dummySearchResults.slice(
            Math.floor(dummySearchResults.length / 2)
          ),
        ].map((result) => (
          <ThemeItem key={result.id}>{result.title}</ThemeItem>
        ))}
      </Container>
    </Wrapper>
  );
}

const dummySearchResults = [
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
];

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ThemeItem = styled.div`
  border-radius: 1rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  width: 20rem;
  height: 25rem;
  @media (max-height: 800px) {
    width: 15rem;
    height: 20rem;
  }
  background-color: #3e2133;
`;
