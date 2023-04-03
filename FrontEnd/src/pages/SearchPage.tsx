import React, { useState, useReducer, useEffect } from "react";
import SearchInput from "@components/search/SearchInput";
import SearchSortOptions from "@components/search/SearchSortOptions";
import SearchFilter from "@components/search/SearchFilter";
import SearchResult from "@components/search/SearchResult";
import Header from "@components/common/Header";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { getSearchThemes } from "@/api/theme";
import {
  PreviewThemeResponse,
  SortOption,
  SortOrder,
  FilterValue,
  ReducerAction,
} from "types/search";

const INITIAL_RESULT_DATA: PreviewThemeResponse[] = [];

const INITIAL_FILTER_SET_VALUE: FilterValue = {
  regionBig: "전체",
  regionSmall: "전체",
  genreId: 0,
  difficultyS: 1,
  difficultyE: 5,
  people: 0,
  time: 0,
};

const filterReducer = (
  oldFilterValue: FilterValue,
  action: ReducerAction
): FilterValue => {
  switch (action.type) {
    case "regionBig":
      return { ...oldFilterValue, regionBig: action.newValue.regionBig };
    case "regionSmall":
      return { ...oldFilterValue, regionSmall: action.newValue.regionSmall };
    case "genreId":
      return { ...oldFilterValue, genreId: action.newValue.genreId };
    case "difficultyS":
      return { ...oldFilterValue, difficultyS: action.newValue.difficultyS };
    case "difficultyE":
      return { ...oldFilterValue, difficultyE: action.newValue.difficultyE };
    case "people":
      return { ...oldFilterValue, people: action.newValue.people };
    case "time":
      return { ...oldFilterValue, time: action.newValue.time };
    case "reset":
      return { ...INITIAL_FILTER_SET_VALUE };
  }
};

export default function SearchPage() {
  // SearchResult 관련 변수
  const [results, setResults] =
    useState<PreviewThemeResponse[]>(INITIAL_RESULT_DATA);
  const [searchHappened, setSearchHappened] = useState<boolean>(false);
  // SearchInput 관련 변수, 함수
  const [searchWord, setInputValue] = useState<string>("");
  const handleInputChange = (newInput: string) => {
    setInputValue(newInput);
  };

  // 검색 요청 관련 변수, 함수
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  // 검색을 트리거하는 함수 => result에 저장
  const handleSubmit = async (isInitSearch: boolean) => {
    if (isInitSearch) {
      // 1페이지를 요청하는 경우
      const INIT_PAGE = 1;
      const response = await getSearchThemes({
        word: searchWord,
        ...filterValue,
        page: INIT_PAGE,
        sortby: sortOption,
        orderby: sortOrder,
      });
      setResults(response.data.themes);
      setIsLastPage(response.data.isLast);
      setPage(INIT_PAGE + 1);
    } else {
      // 다음 페이지를 요청하는 경우
      const response = await getSearchThemes({
        word: searchWord,
        ...filterValue,
        page: page,
        sortby: sortOption,
        orderby: sortOrder,
      });
      setResults((prev) => [...prev, ...response.data.themes]);
      setIsLastPage(response.data.isLast);
      setPage((prev) => prev + 1);
    }
    setSearchHappened(true);
  };

  // 초기 검색 요청
  useEffect(() => {
    handleSubmit(true);
  }, []);

  // SearchFilter 관련 변수, 함수
  const [filterValue, filterValueDispatch] = useReducer(
    filterReducer,
    INITIAL_FILTER_SET_VALUE
  );

  const handleFilterValueChange = (action: ReducerAction) => {
    filterValueDispatch(action);
  };

  // 장르 카테고리만 따로 관리하는 dump 변수, 함수(장르 카테고리를 저장해서 초기 렌더링 시에만 활용)
  const [
    dumpFilterGenreCategoryInputValue,
    setDumpFilterGenreCategoryInputValue,
  ] = useState<string>("전체");
  const handleDumpFilterGenreCategoryInputValueChange = (
    genreCategoryInputValue: string
  ) => {
    setDumpFilterGenreCategoryInputValue(genreCategoryInputValue);
  };

  // SearchSortOptions 관련 변수, 함수
  const [sortOption, setSortOption] = useState<SortOption>("userRating");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const handleSortOptionOrderChange = (option: SortOption) => {
    if (sortOption === option) {
      setSortOrder((prev: SortOrder) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortOption(() => option);
      setSortOrder(() => "desc");
    }
  };

  // sortOption, sortOrder가 변경될 때마다 검색 요청
  // 단, 초기 렌더링 시 sideEffectFunction이 실행되지 않도록 함.
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    handleSubmit(true);
  }, [sortOption, sortOrder]);

  return (
    <>
      <Header />
      <BackGround>
        <ContentWrapper>
          <FormContainer>
            <SearchInput
              searchWord={searchWord}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
            <SearchFilter
              filterValue={filterValue}
              handleFilterValueChange={handleFilterValueChange}
              dumpFilterGenreCategoryInputValue={
                dumpFilterGenreCategoryInputValue
              }
              handleDumpFilterGenreCategoryInputValueChange={
                handleDumpFilterGenreCategoryInputValueChange
              }
              handleSubmit={handleSubmit}
            />
          </FormContainer>
          <SearchSortOptions
            sortOption={sortOption}
            sortOrder={sortOrder}
            handleSortOptionOrderChange={handleSortOptionOrderChange}
          />
          <SearchResult
            results={results}
            searchHappened={searchHappened}
            isLastPage={isLastPage}
            handleSubmit={handleSubmit}
          />
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
  margin: 3rem auto;
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
