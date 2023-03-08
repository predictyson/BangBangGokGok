import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      turtleDark: string;
      turtleStandard: string;
      turtleLight: string;
      greyDark: string;
      greyStandard: string;
      greyLight: string;
      greyDim: string;
      primary: string;
      secondary: string;
    };
    fontWeight: {
      hairline: number;
      extraLight: number;
      thin: number;
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      extraBold: number;
      black: number;
    };
  }
}
