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
`;

interface IContainerProps {
  maxWidth?: string | number;
  children: React.ReactFragment;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  justify?:
    | "start"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "stretch" | "center" | "start" | "end";
  margin?: string;
  as?: string;
  theme?: any;
}

function Container({
  maxWidth,
  children,
  direction = "row",
  justify = "start",
  align = "stretch",
  margin = "auto",
  as,
}: IContainerProps) {
  return (
    <StyledContainer
      maxWidth={maxWidth}
      direction={direction}
      justify={justify}
      align={align}
      margin={margin}
    >
      {children}
    </StyledContainer>
  );
}

export default Container;
