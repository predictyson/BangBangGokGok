import React, { useState } from "react";
import styled from "styled-components";
import { PreviewThemeResponse } from "types/search";

interface SearchResultProps {
  results: PreviewThemeResponse[];
}

export default function SearchResult(props: SearchResultProps) {
  const [searchResults, setSearchResults] = useState<PreviewThemeResponse[]>([
    ...props.results,
  ]);
  // const [searchResults, setSearchResults] = useState<PreviewThemeResponse[]>(
  //   props.results
  // );

  console.log(searchResults);

  return (
    <Wrapper>
      <Container>
        {props.results.map((result) => (
          <ThemeItem key={result.themeId}>{result.title}</ThemeItem>
        ))}
      </Container>
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
  gap: 2.5rem;
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
