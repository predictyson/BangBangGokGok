import { createTheme } from "@mui/material";
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    background: "#3E2133",
    container: "#33202F",
    containerLight: "#4A344A",
    white: "#FFFFFF",
    pink: "#FF5B79",
    selectedItem: "#FFF1F8",
    selectedItemBackground: "#58424D",
    unselectedItem: "#000000",
    unselectedItemBackground: "#FFF1F8",
    success: "#007bff",
    update: "#00BFA6",
    failure: "#FF5B79",
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
      main: "#33202F",
    },
    secondary: {
      main: "#3E2133",
    },
    warning: {
      main: "#fff",
    },
    info: {
      main: "#FF5B79",
    },
  },
});
