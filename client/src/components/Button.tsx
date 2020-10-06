import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly fullWidth?: boolean;
  readonly width?: string;
  readonly fontSize?: string;
  readonly highlighted?: boolean;
}

const StyledButton = styled.button<IButton>`
  display: ${(props) => (props.fullWidth ? "block" : "flex")};
  width: ${(props) =>
    props.fullWidth ? "100%" : props.width ? props.width : "max-content"};
  background-color: ${(props) =>
    props.highlighted
      ? props.theme.palette.secondary.light
      : props.theme.palette.primary.light};
  color: ${(props) =>
    props.highlighted
      ? props.theme.palette.primary.light
      : props.theme.palette.secondary.dark};
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-family: Roboto;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "0.875rem")};
  font-weight: 500;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.highlighted
        ? props.theme.palette.secondary.main
        : props.theme.palette.primary.dark};
    color: ${(props) =>
      props.highlighted
        ? props.theme.palette.primary.main
        : props.theme.palette.secondary.main};
  }
`;

function Button({
  children,
  fullWidth,
  fontSize,
  onClick,
  width,
  highlighted,
  ...props
}: IButton) {
  return (
    <StyledButton
      width={width}
      fontSize={fontSize}
      fullWidth={fullWidth}
      onClick={onClick}
      highlighted={highlighted}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
