import { createTheme } from "@mui/material";
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    turtleDark: "#386641",
    turtleStandard: "#6A994E", // bg-turtle-standard
    turtleLight: "#A7C957",
    greyDark: "#5C5B5B",
    greyStandard: "#8E8E8E",
    greyLight: "#E6E6E6",
    greyDim: "#D1D1D1",
    primary: "#386641",
    secondary: "#A7C957",
  },
  fontWeight: {
    hairline: 100,
    extraLight: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    extraBold: 800,
    black: 900,
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
