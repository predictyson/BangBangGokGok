import React, { useEffect, useState } from "react";
import { styled as mstyled } from "@mui/material/styles";
import styled from "styled-components";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { IGenre, ProfileProps } from "types/auth";
import { requestOther } from "@/api/auth";

export default function GenreSection(props: ProfileProps) {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const handleChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newAlignment: number[]
  ) => {
    if (newAlignment.length > 4) {
      props.handleToastClick("error", "장르는 최대 4개까지만 설정 가능합니다.");
    } else {
      props.changeUserInfo("genreIds", newAlignment);
    }
  };

  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await requestOther();
        setGenres(data.genres);
      } catch (err) {
        console.log(err);
      }
    };

    getGenres();
  }, []);

  return (
    <Container>
      <ToggleButtonGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto",
          gridGap: "20px",
          padding: "10px",
          width: "100%",
          borderRadius: "10px",
        }}
        value={props.userAdditionalInfo.genreIds}
        onChange={handleChange}
      >
        {genres.map((item: IGenre) => (
          <CustomToggleButton key={item.genreId} value={item.genreId}>
            {item.category}
          </CustomToggleButton>
        ))}
      </ToggleButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomToggleButton = mstyled(ToggleButton)({
  width: "18rem",
  height: "12rem",
  backgroundColor: "#58424D",
  borderRadius: "1.5rem !important",
  fontSize: "3rem",
  fontWeight: "medium",
  color: "#FFF1F8",

  ":hover": {
    backgroundColor: "#FFF1F8",
    color: "#58424D",
  },

  "&.Mui-selected": {
    backgroundColor: "#FFF1F8",
    fontWeight: "bold",
    color: "#58424D",
  },

  "&.Mui-selected :hover": {
    backgroundColor: "#FFF1F8",
    fontWeight: "bold",
    color: "#58424D",
  },
});

// const CustomToggleButton = mstyled(ToggleButton)`
//   height: 9rem;
//   background-color: #FFF1F8;
//   border-radius: 1.5rem !important;
//   font-size: 3rem;
//   color: #58424D;
//   font-weight: bold;

//   &.Mui-selcted {
//     background-color: red ;
//   }

//   :hover {
//     background-color: #58424D;
//     color: #FFF1F8;

//   }
// `;
