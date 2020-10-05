import { DefaultTheme } from "styled-components";
const theme: DefaultTheme = {
  breakpoints: {
    values: { xs: 0, sm: "37.5em", md: "60em", lg: "80em", xl: "120em" },
    up: function (value) {
      return `@media only screen and (min-width: ${theme.breakpoints.values[value]})`;
    },
    down: function (value) {
      return `@media only screen and (max-width: ${theme.breakpoints.values[value]})`;
    },
  },
  palette: {
    primary: { light: "#fff", main: "#f3f3f3", dark: "#e7e7e7" },
    secondary: { light: "#636161", main: "#303030", dark: "#292929" },
    text: {
      primary: "#fff",
      secondary: "#fd85ff",
      tertiary: "#6e6e6e",
    },
  },
  typography: {
    h1: {
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontWeight: 400,
      fontSize: ".875rem",
      lineHeight: 1.43,
      letterSpacing: "0.00938em",
    },
    button: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
    caption: {
      fontWeight: 400,
      fontSize: ".75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
  },
};

export default theme;
