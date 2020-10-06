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
      players: Object<string>;
    };

    typography: {
      h1: TTypographyItem;
      h2: TTypographyItem;
      h3: TTypographyItem;
      h4: TTypographyItem;
      h5: TTypographyItem;
      h6: TTypographyItem;
      subtitle1: TTypographyItem;
      subtitle2: TTypographyItem;
      body1: TTypographyItem;
      body2: TTypographyItem;
      button: TTypographyItem;
      caption: TTypographyItem;
    };
  }
}
