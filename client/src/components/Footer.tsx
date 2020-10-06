import React from "react";
import styled from "styled-components";
import { Home3, Stack, Exit } from "@styled-icons/icomoon";
import { StyledIconBase } from "@styled-icons/styled-icon";
import { useAppDispatch } from "../contexts/appContext";
import IconButton from "./IconButton";
export const IconStyleWrapper = styled.div`
  ${StyledIconBase} {
    color: white;
  }
`;
const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.25rem;
  background-color: ${(props) => props.theme.palette.secondary.light};
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Footer() {
  const dispatch = useAppDispatch();
  const handleClick = (num: number) => () => {
    dispatch({ type: "setActiveTab", payload: num });
  };
  return (
    <IconStyleWrapper>
      <StyledFooter>
        <IconButton>
          <Home3 size={28} onClick={handleClick(1)} />
        </IconButton>
        <IconButton>
          <Stack size={28} onClick={handleClick(2)} />
        </IconButton>
        <IconButton>
          <Exit size={28} onClick={handleClick(3)} />
        </IconButton>
      </StyledFooter>
    </IconStyleWrapper>
  );
}

export default Footer;
