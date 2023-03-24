import React, { useState } from "react";
import SearchInput from "@components/search/SearchInput";
import SearchSortOptions from "@components/search/SearchSortOptions";
import SearchFilter from "@components/search/SearchFilter";
import SearchResult from "@components/search/SearchResult";
import Header from "@components/common/Header";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { SearchParams } from "types/search";
import { getSearchThemes } from "@/api/theme";
import { PreviewThemeResponse, SortOption, SortOrder } from "types/search";

const DUMMY_RESULT_DATA = [
  {
    themeId: -1,
    title: "",
    imgUrl: "",
    genres: [""],
  },
];

export default function SearchPage() {
  // SearchResult 관련 변수
  const [results, setResults] =
    useState<PreviewThemeResponse[]>(DUMMY_RESULT_DATA);

  // SearchInput 관련 변수, 함수
  const [input, setInputValue] = useState<string>("");
  const handleInputChange = (newInput: string) => {
    setInputValue(newInput);
  };

  // 검색을 트리거하는 함수 => result에 저장
  const handleSubmit = () => {
    const requestSearch = async (searchParams: SearchParams) => {
      const response = await getSearchThemes(searchParams);
      setResults(response.data);
    };
    // requestSearch({});
  };

  // SearchFilter 관련 변수, 함수
  // const [filter, setFilterValue] = useState<string>("");

  // SearchSortOptions 관련 변수, 함수
  const [sortOption, setSortOption] = useState<SortOption>("userRating");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const handleSortOptionOrderChange = (option: SortOption) => {
    if (sortOption === option) {
      setSortOrder((prev: SortOrder) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortOption(option);
      setSortOrder("desc");
    }
  };

  console.log(sortOption, sortOrder);

  return (
    <>
      <Header />
      <BackGround>
        <ContentWrapper>
          <FormContainer>
            <SearchInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
            <SearchFilter />
          </FormContainer>
          <SearchSortOptions
            sortOption={sortOption}
            sortOrder={sortOrder}
            handleSortOptionOrderChange={handleSortOptionOrderChange}
          />
          <SearchResult />
        </ContentWrapper>
      </BackGround>
    </>
  );
}

const BackGround = styled.div`
  height: 90vh;
  background-color: ${theme.colors.background};
`;

const ContentWrapper = styled.div`
  width: 90%;
  box-sizing: border-box;
  height: 95%;
  margin: 0 auto;
  padding: 3rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
