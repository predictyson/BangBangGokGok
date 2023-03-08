import React from "react"
import Container from "@mui/material/Container"
import SearchInput from "@components/search/SearchInput"
import SearchSortOptions from "@components/search/SearchSortOptions"

export default function SearchPage() {
  return (
    <Container>
      <SearchInput />
      <SearchSortOptions />
    </Container>
  )
}
