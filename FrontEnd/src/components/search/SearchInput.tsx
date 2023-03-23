import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

export default function SearchInput() {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = () => {
    console.log(searchText);
  };

  return (
    <Container>
      <InputContainer>
        <Input onChange={handleChange} placeholder="검색어를 입력하세요." />
      </InputContainer>
      <SearchButton onClick={handleSubmit}>
        <SearchIcon fontSize="large" color="warning" />
      </SearchButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 61.5rem;
  height: 100%;
  border-radius: 20px;
  border: 1px solid white;
`;

const InputContainer = styled.div`
  width: 85%;
  /* height: 100%; */
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  /* height: 5rem; */
  padding: 0 1rem;
  font-size: 2rem;
  border: none;
  background-color: transparent;
  color: white;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 5rem;
  height: 5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
