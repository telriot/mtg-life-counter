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
    primary: { light: "#fff", main: "#f3f3f3", dark: "#c7c7c7" },
    secondary: { light: "#636161", main: "#303030", dark: "#292929" },
    text: {
      primary: "#fff",
      secondary: "#fd85ff",
      tertiary: "#6e6e6e",
    },
    players: {
      p0: { main: "#F8E067", dark: "#ffd500" },
      p1: { main: "#40C035", dark: "#0fbf00" },
      p2: { main: "#4E91F6", dark: "#0065fc" },
      p3: { main: "#CA4DA7", dark: "#d10097" },
      p4:{main:"#f5a442", dark:"#eb8000"}
    },
  },
};

export default theme;
