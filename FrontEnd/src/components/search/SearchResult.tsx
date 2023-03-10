import React from "react";
import Box from "@mui/material/Box";

export default function SearchResult() {
  return (
    <Box sx={wrapperStyle}>
      <Box sx={containerStyle}>
        {[
          ...dummySearchResults.slice(
            0,
            Math.floor(dummySearchResults.length / 2)
          ),
        ].map((result) => (
          <Box key={result.id} sx={boxStyle}>
            {result.title}
          </Box>
        ))}
      </Box>
      <Box sx={containerStyle}>
        {[
          ...dummySearchResults.slice(
            Math.floor(dummySearchResults.length / 2)
          ),
        ].map((result) => (
          <Box key={result.id} sx={boxStyle}>
            {result.title}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const dummySearchResults = [
  { id: 1, title: "Result 1" },
  { id: 2, title: "Result 2" },
  { id: 3, title: "Result 3" },
  { id: 4, title: "Result 4" },
  { id: 5, title: "Result 5" },
  { id: 6, title: "Result 6" },
  { id: 7, title: "Result 7" },
  { id: 8, title: "Result 8" },
  { id: 9, title: "Result 9" },
  { id: 10, title: "Result 10" },
  { id: 11, title: "Result 11" },
  { id: 12, title: "Result 12" },
  { id: 13, title: "Result 13" },
  { id: 14, title: "Result 14" },
];

const wrapperStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
};

const boxStyle = {
  border: "1px solid white",
  borderRadius: "1rem",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
  width: "15rem",
  height: "20rem",
};
