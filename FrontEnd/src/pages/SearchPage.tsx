import React from "react";
import Container from "@mui/material/Container";
import SearchInput from "@components/search/SearchInput";
import SearchSortOptions from "@components/search/SearchSortOptions";
import SearchFilter from "@components/search/SearchFilter";
import SearchResult from "@components/search/SearchResult";
import Header from "@components/common/Header";

export default function SearchPage() {
  return (
    <>
      <Header />
      <Container>
        <SearchInput />
        <SearchSortOptions />
        <SearchFilter />
        <SearchResult />
      </Container>
    </>
  );
}
