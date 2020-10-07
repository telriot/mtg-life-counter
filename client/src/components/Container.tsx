import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: ${(props: IContainerProps) =>
    props.maxWidth
      ? typeof props.maxWidth === "string"
        ? props.theme.breakpoints.values[props.maxWidth]
        : props.maxWidth
      : "100vw"};
  display: flex;
  margin: ${(props) => (props.maxWidth ? "0 auto" : ".75rem")};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  background: ${(props) => props.background};
  height: ${(props) => props.height};
`;

interface IContainerProps {
  maxWidth?: string | number;
  align?: "stretch" | "center" | "start" | "end";
  background?: string;
  children: React.ReactFragment;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  height?: string;
  justify?:
    | "start"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";

  margin?: string;
  theme?: any;
}

function Container({
  align = "stretch",
  background = "inherit",
  children,
  direction = "row",
  height = "",
  justify = "start",
  margin = "auto",
  maxWidth,
}: IContainerProps) {
  return (
    <StyledContainer
      align={align}
      background={background}
      direction={direction}
      height={height}
      justify={justify}
      margin={margin}
      maxWidth={maxWidth}
    >
      {children}
    </StyledContainer>
  );
}

export default Container;
