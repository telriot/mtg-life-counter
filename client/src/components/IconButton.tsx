import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledIconButton = styled.button<IIconButton>`
  display: flex;
  background-color: transparent;
  border: none;
  border-radius: 100px;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
  outline: none;
  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

function IconButton({ children, onClick, ...props }: IIconButton) {
  return (
    <StyledIconButton onClick={onClick} {...props}>
      {children}
    </StyledIconButton>
  );
}

export default IconButton;
