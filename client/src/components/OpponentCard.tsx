import React from "react";
import { TUser } from "../types/index";
import { useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import OppCmdDmgSection from "./OppCmdDmgSection";
import { getUserNumber } from "../lib/helpers";

interface ICardContainerProps {
  readonly userNumber?: number;
  readonly index: number;
  readonly lastUsersIndex?: number;
}
interface IOpponentNameProps {
  active?: boolean;
}
interface IOpponentLifeProps {
  active?: boolean;
}

const CardContainer = styled.div<ICardContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-left: ${(props) =>
    props.index ? `3px solid ${props.theme.palette.secondary.dark}` : "none"};
  border-right: ${(props) =>
    props.index !== props.lastUsersIndex
      ? `3px solid ${props.theme.palette.secondary.dark}`
      : "none"};
  border-bottom: 8px solid
    ${(props) => props.theme.palette.players[`p${props.userNumber}`].main};
  background-color: ${(props) => props.theme.palette.secondary.main};

  flex: 1;
`;
const OpponentName = styled.span<IOpponentNameProps>`
  font-family: Roboto;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: ${(props) =>
    props.active
      ? props.theme.palette.text.primary
      : props.theme.palette.secondary.light};
`;
const OpponentLife = styled.span<IOpponentLifeProps>`
  font-family: Roboto;
  font-size: 2.5rem;
  font-weight: 500;
  color: ${(props) =>
    props.active
      ? props.theme.palette.text.primary
      : props.theme.palette.secondary.light};
`;

interface IOpponentCard {
  playerData?: TUser;
  index: number;
}

function OpponentCard({ playerData, index }: IOpponentCard) {
  const { joinedRoom } = useSocketState();

  const userNumber = getUserNumber(playerData?.username, joinedRoom?.users);
  const lastUsersIndex = (joinedRoom?.users.length || 0) - 2;
  return (
    <CardContainer
      index={index}
      userNumber={userNumber}
      lastUsersIndex={lastUsersIndex}
    >
      <OpponentName active={playerData?.active}>
        {playerData?.username}
      </OpponentName>
      <OpponentLife active={playerData?.active}>
        {playerData?.life}
      </OpponentLife>
      <OppCmdDmgSection opponent={playerData} />
    </CardContainer>
  );
}

export default OpponentCard;
