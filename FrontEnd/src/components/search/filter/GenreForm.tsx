import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { getGenres } from "@/api/others";
import { FilterValue, ReducerAction, GenreResponse } from "types/search";

interface GenreFormProps {
  filterValue: FilterValue;
  handleFilterValueChange: (action: ReducerAction) => void;
  dumpFilterGenreCategoryInputValue: string;
  handleDumpFilterGenreCategoryInputValueChange: (
    genreCategoryInputValue: string
  ) => void;
}

export default function GenreForm(props: GenreFormProps) {
  const [genresOptions, setGenresOptions] = useState<GenreResponse[]>([
    { genreId: 0, category: "전체" },
  ]);

  const [genreInputValue, setGenreInputValue] = useState(
    props.dumpFilterGenreCategoryInputValue
  );

  const handleGenreChange = (event: SelectChangeEvent<unknown>) => {
    // 장르명 변경
    setGenreInputValue(event.target.value as string);
    // 덤프값 변경(덤프값은 초기렌더링시에 이전 렌더링에서 사용했던 값을 그대로 가져오는 역할을 함)
    props.handleDumpFilterGenreCategoryInputValueChange(
      event.target.value as string
    );

    // 장르명 -> genreId로 변환
    const genreId = genresOptions.find(
      (genre) => genre.category === event.target.value
    )?.genreId;

    // 조부모 컴포넌트(SearchPage)의 filterValue를 변경
    props.handleFilterValueChange({
      type: "genreId",
      newValue: { ...props.filterValue, genreId: genreId as number },
    });
  };

  useEffect(() => {
    // 장르 옵션 불러오기
    const requestGenres = async () => {
      const response = await getGenres();
      setGenresOptions([
        { genreId: 0, category: "전체" },
        ...response.data.genres,
      ]); // prev => [prev, ...response.data.genres] 로 짜고 싶은데 안됨

      // 장르id로 장르이름 찾기
      // setGenreInputValue(
      //   genresOptions.find(
      //     (genre) => genre.genreId === props.filterValue.genreId
      //   )?.category as string
      // );
    };
    requestGenres();
  }, []);

  // 장르id로 장르이름 찾기
  // setGenreInputValue(
  //   genresOptions.find(
  //     (genre) => genre.genreId === props.filterValue.genreId
  //   )?.category as string
  // );

  return (
    <Wrapper>
      <div style={{ flexBasis: "15%" }}>
        <CustomInputLabel id="genre-select">장르</CustomInputLabel>
      </div>
      <div style={{ flexBasis: "85%" }}>
        <CustomSelect
          labelId="genre-select"
          value={genreInputValue}
          color="warning"
          onChange={handleGenreChange}
          MenuProps={{
            style: {
              maxHeight: "350px",
            },
          }}
        >
          {genresOptions.map((genre) => (
            <CustomMenuItem value={genre.category} key={genre.genreId}>
              {genre.category}
            </CustomMenuItem>
          ))}
        </CustomSelect>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  font-size: 1.8rem;
  border-radius: 10px;
  color: white;
`;

const CustomInputLabel = mstyled(InputLabel)`
  font-size: 2.7rem;
  @media (max-width: 1536px) {
    font-size: 2.2rem;

  }
  font-weight: 600;
  color: white;
  margin-right: 1.5rem;
`;

const CustomSelect = mstyled(Select)`
  height: 4rem;
  font-size: 2rem;
  @media (max-width: 1536px) {
    font-size: 1.7rem;
  }
  border: 1px solid white;
  color: white;
  svg {
    color: white;
  }
`;

const CustomMenuItem = mstyled(MenuItem)`
  font-size: 2rem;
  @media (max-width: 1536px) {
    font-size: 1.7rem;
  }
`;
