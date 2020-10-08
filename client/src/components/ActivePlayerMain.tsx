import React from "react";
import { TUser } from "../types/index";
import { useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import LifeCounter from "./LifeCounter";
import { getUserNumber } from "../lib/helpers";
//import { joinedRoom } from "../data";

interface IHiglightProps {
  userNumber?: number;
}
const ActivePlayerContainer = styled.div`
  grid-row: main-start/main-end;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const UsernameDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const ActivePlayerName = styled.span`
  font-family: Roboto;
  font-size: 2.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.text.primary};
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 2rem;
  }
`;
const Highlight = styled.div<IHiglightProps>`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background-color: ${(props) =>
    props.theme.palette.players[`p${props.userNumber}`].main};
`;
const ActivePlayerLife = styled.span`
  position: relative;
  font-family: Roboto;
  font-size: 5.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.text.primary};
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 4rem;
  }
`;

function ActivePlayerMain({ playerData }: { playerData?: TUser }) {
  const { joinedRoom } = useSocketState();

  return (
    <ActivePlayerContainer>
      <UsernameDiv>
        <ActivePlayerName>{playerData?.username}</ActivePlayerName>
        <Highlight
          userNumber={getUserNumber(playerData?.username, joinedRoom?.users)}
        />
      </UsernameDiv>
      <ActivePlayerLife>{playerData?.life}</ActivePlayerLife>
      <LifeCounter />
    </ActivePlayerContainer>
  );
}

export default ActivePlayerMain;
