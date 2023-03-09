import React from "react";
import SearchInput from "@components/search/SearchInput";
import SearchSortOptions from "@components/search/SearchSortOptions";
import SearchFilter from "@components/search/SearchFilter";
import SearchResult from "@components/search/SearchResult";
import Header from "@components/common/Header";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function SearchPage() {
  return (
    <>
      <Header />
      <BackGround>
        <Content>
          <SearchInput />
          <SearchSortOptions />
          <SearchFilter />
          <SearchResult />
        </Content>
      </BackGround>
    </>
  );
}

const BackGround = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.background};
`;

const Content = styled.div`
  width: 79%;
  margin: 2rem auto;
  padding: 0px 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;
