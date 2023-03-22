import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      container: string;
      containerLight: string;
      white: string;
      pink: string;
      selectedItem: string;
      selectedItemBackground: string;
      unselectedItem: string;
      unselectedItemBackground: string;
      success: string;
      failure: string;
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
