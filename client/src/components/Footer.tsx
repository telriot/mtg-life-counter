import React from "react";
import styled from "styled-components";
import { Home3, Stack, Exit } from "@styled-icons/icomoon";
import { StyledIconBase } from "@styled-icons/styled-icon";

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
  return (
    <IconStyleWrapper>
      <StyledFooter>
        <Home3 size={28} />
        <Stack size={28} />
        <Exit size={28} />
      </StyledFooter>
    </IconStyleWrapper>
  );
}

export default Footer;
