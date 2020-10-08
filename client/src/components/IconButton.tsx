import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledIconButton = styled.button<IIconButton>`
  display: flex;
  justify-content: center;
  border: none;
  border-radius: 100px;
  padding: 0.75rem;
  align-items: center;
  background-color: transparent;
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.secondary.dark
      : props.theme.palette.text.primary};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  outline: none;
  transition: background-color 0.2s;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

function IconButton({ children, disabled, onClick, ...props }: IIconButton) {
  return (
    <StyledIconButton disabled={disabled} onClick={onClick} {...props}>
      {children}
    </StyledIconButton>
  );
}

export default IconButton;
