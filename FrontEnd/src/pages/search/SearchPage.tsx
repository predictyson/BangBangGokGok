import React from "react";
import Container from "@mui/material/Container";
import SearchInput from "@components/search/SearchInput";
import SearchSortOptions from "@components/search/SearchSortOptions";
import SearchFilter from "@components/search/SearchFilter";
import SearchResult from "@components/search/SearchResult";

export default function SearchPage() {
  return (
    <Container>
      <SearchInput />
      <SearchSortOptions />
      <SearchFilter />
      <SearchResult />
    </Container>
  );
}
