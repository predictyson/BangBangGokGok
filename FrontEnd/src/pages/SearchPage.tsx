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
import { PreviewThemeResponse } from "types/search";

export default function SearchPage() {
  // SearchInput 관련 변수, 함수
  const [input, setInputValue] = useState<string>("");
  const handleChange = () => {
    setInputValue(input);
  };
  const handleSubmit = () => {
    const requestSearch = async (searchParams: SearchParams) => {
      await getSearchThemes(searchParams);
    };
  }; // 검색을 트리거하는 함수 => result에 저장

  // SearchFilter 관련 변수, 함수
  // const [filter, setFilterValue] = useState<string>("");

  // SearchSortOptions 관련 변수, 함수
  const [sortOption, setSortOption] = useState<string>(OPTIONS[0]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // SearchResult 관련 변수
  const [results, setResults] =
    useState<PreviewThemeResponse[]>(DUMMY_RESULT_DATA);

  return (
    <>
      <Header />
      <BackGround>
        <ContentWrapper>
          <FormContainer>
            <SearchInput
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <SearchFilter />
          </FormContainer>
          <SearchSortOptions
            sortOption={sortOption}
            setSortOption={setSortOption}
            setSortOrder={setSortOrder}
          />
          <SearchResult />
        </ContentWrapper>
      </BackGround>
    </>
  );
}

const DUMMY_RESULT_DATA = [
  {
    themeId: -1,
    title: "",
    imgUrl: "",
    genres: [""],
  },
];

const OPTIONS: string[] = ["평점", "활동성", "공포도", "체감 난이도"];

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
