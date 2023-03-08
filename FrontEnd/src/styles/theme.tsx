import { createTheme } from "@mui/material";
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    background: "#3E2133",
    container: "#33202F",
    containerLight: "#4A344A",
    pink: "#FF5B79",
    selectedItem: "#58424D",
    unselectedItem: "#FFF1F8",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    extraBold: 800,
  },
};

export const mtheme = createTheme({
  palette: {
    primary: {
      main: "#386641",
    },
    secondary: {
      main: "#A7C957",
    },
    info: {
      main: "#8E8E8E",
    },
  },
});
