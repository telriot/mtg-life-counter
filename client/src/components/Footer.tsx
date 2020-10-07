import React from "react";
import { useAppDispatch } from "../contexts/appContext";
import { useSocketDispatch, useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import { Home3, Stack, Exit, Pacman } from "@styled-icons/icomoon";
import { StyledIconBase } from "@styled-icons/styled-icon";
import IconButton from "./IconButton";
//import { joinedRoom, myUserProfile } from "../data";

export const IconStyleWrapper = styled.div`
  ${StyledIconBase} {
    color: inherit;
  }
`;
const StyledFooter = styled.footer`
  grid-row: footer-start/footer-end;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.secondary.light};
`;
const IconDiv = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.values.md};
  display: flex;
  justify-content: space-around;
`;
function Footer() {
  const { activeSocket, joinedRoom, myUserProfile } = useSocketState();
  //const { activeSocket } = useSocketState();
  const dispatch = useAppDispatch();
  const socketDispatch = useSocketDispatch();

  const handleSelection = (num: number) => () => {
    dispatch({ type: "setActiveTab", payload: num });
  };

  const handleExit = () => {
    activeSocket.emit("leaveRoom", {
      roomName: joinedRoom?.name,
      socketID: myUserProfile?.socketID,
    });
    socketDispatch({ type: "leaveRoom" });
    dispatch({ type: "setActiveTab", payload: 1 });
  };

  return (
    <IconStyleWrapper>
      <StyledFooter>
        <IconDiv>
          <IconButton onClick={handleSelection(1)}>
            <Home3 size={28} />
          </IconButton>
          <IconButton onClick={handleSelection(2)}>
            <Stack size={28} />
          </IconButton>
          <IconButton disabled={!joinedRoom} onClick={handleSelection(3)}>
            <Pacman size={28} />
          </IconButton>
          <IconButton disabled={!joinedRoom} onClick={handleExit}>
            <Exit size={28} />
          </IconButton>
        </IconDiv>
      </StyledFooter>
    </IconStyleWrapper>
  );
}

export default Footer;
