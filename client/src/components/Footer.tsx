import React from "react";
import styled from "styled-components";
import { Home3, Stack, Exit, Pacman } from "@styled-icons/icomoon";
import { StyledIconBase } from "@styled-icons/styled-icon";
import { useAppDispatch } from "../contexts/appContext";
import IconButton from "./IconButton";
import { useSocketDispatch, useSocketState } from "../contexts/socketContext";
export const IconStyleWrapper = styled.div`
  ${StyledIconBase} {
    color: inherit;
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
  const { activeSocket, joinedRoom, myUserProfile } = useSocketState();
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
      </StyledFooter>
    </IconStyleWrapper>
  );
}

export default Footer;
