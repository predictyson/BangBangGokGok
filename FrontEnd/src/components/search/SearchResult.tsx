import React, { useState } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { PreviewThemeResponse } from "types/search";

interface SearchResultProps {
  results: PreviewThemeResponse[];
}

export default function SearchResult(props: SearchResultProps) {
  const [searchResults, setSearchResults] = useState<PreviewThemeResponse[]>(
    props.results
  );

  return (
    <Wrapper>
      <Container>
        {searchResults.map((result) => (
          <ThemeItem key={result.themeId}>{result.title}</ThemeItem>
        ))}
      </Container>
      {/* <Container>

        {[...searchResults.slice(0, Math.floor(searchResults.length / 2))].map(
          (result) => (
            <ThemeItem key={result.themeId}>{result.title}</ThemeItem>
          )
        )}
      </Container> */}
      {/* <Container>
        {[...searchResults.slice(Math.floor(searchResults.length / 2))].map(
          (result) => (
            <ThemeItem key={result.themeId}>{result.title}</ThemeItem>
          )
        )}
      </Container> */}
    </Wrapper>
  );
}

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
