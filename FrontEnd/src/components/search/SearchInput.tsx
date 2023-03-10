import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled as mstyled } from "@mui/material/styles";
import styled from "styled-components";

export default function SearchInput() {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  console.log(searchText);

  return (
    <Container>
      <Input onChange={handleChange} placeholder="검색어를 입력하세요." />
    </Container>
  );
}

const Container = styled.div`
  width: 50rem;
`;

const Input = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  font-size: 2rem;
  border-radius: 20px;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  &:focus {
    outline: none;
  }
`;
