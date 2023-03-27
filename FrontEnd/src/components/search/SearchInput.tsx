import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

interface SearchInputProps {
  searchWord: string;
  handleInputChange: (input: string) => void;
  handleSubmit: () => void;
}

export default function SearchInput(props: SearchInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleInputChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <InputContainer>
          <Input
            onChange={handleChange}
            value={props.searchWord}
            placeholder="검색어를 입력하세요."
          />
        </InputContainer>
        <SearchButton type="submit">
          <SearchIcon fontSize="large" color="warning" />
        </SearchButton>
      </Container>
    </form>
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
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
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
