import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly fullWidth?: boolean;
}

const StyledButton = styled.button<IButton>`
  display: ${(props) => (props.fullWidth ? "block" : "flex")};
  width: ${(props) => (props.fullWidth ? "100%" : "max-content")};
  background-color: ${(props) => props.theme.palette.primary.light};
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-family: Roboto;
  text-transform: uppercase;
  font-weight: 500;
  transition: background-color 0.2s;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.palette.primary.dark};
  }
`;

function Button({ children, fullWidth, ...props }: IButton) {
  return (
    <StyledButton fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
