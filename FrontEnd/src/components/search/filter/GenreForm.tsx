import React, { useState } from "react";

export default function GenreForm() {
  const [genre, setGenre] = useState("전체");
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  return (
    <div>
      <label htmlFor="genre-select">장르</label>
      <select
        id="genre-select"
        name="genre"
        value={genre}
        onChange={handleGenreChange}
      >
        <option value="전체">전체</option>
        <option value="공포">공포</option>
        <option value="추리">추리</option>
        <option value="스릴러">스릴러</option>
        <option value="판타지">판타지</option>
      </select>
    </div>
  );
}
