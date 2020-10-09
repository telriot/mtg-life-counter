import "styled-components";
export type TSize = "xs" | "sm" | "md" | "lg" | "xl";
type TPaletteScheme = { light: string; main: string; dark: string };
type TPaletteText = { primary: string; secondary: string; tertiary: string };
type TTypographyItem = {
  fontWeight: number;
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
  textTransform?: "uppercase";
};

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      values: {
        xs: string | number;
        sm: string | number;
        md: string | number;
        lg: string | number;
        xl: string | number;
      };
      up: (value: TSize) => string;
      down: (value: TSize) => string;
    };
    palette: {
      primary: TPaletteScheme;
      secondary: TPaletteScheme;
      text: TPaletteText;
      players: any;
    };
  }
}
