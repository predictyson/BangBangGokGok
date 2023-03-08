import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      container: string;
      containerLight: string;
      pink: string;
      selectedItem: string;
      unselectedItem: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      extraBold: number;
    };
  }
}
