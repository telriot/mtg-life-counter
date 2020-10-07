import React from "react";
import { TRoom, TUser } from "../types/index";
import styled from "styled-components";

interface ICardContainerProps {
  readonly userNumber?: number;
  readonly index: number;
  readonly lastUsersIndex?: number;
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
    ${(props) => props.theme.palette.players[`p${props.userNumber}`]};
  background-color: ${(props) => props.theme.palette.secondary.main};

  flex: 1;
`;
const OpponentName = styled.span`
  font-family: Roboto;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.text.primary};
`;
const OpponentLife = styled.span`
  font-family: Roboto;
  font-size: 2.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.text.primary};
`;

function OpponentCard({
  playerData,
  joinedRoom,
  index,
}: {
  playerData?: TUser;
  joinedRoom?: TRoom;
  index: number;
}) {
  const userNumber = joinedRoom?.users.findIndex(
    (user) => playerData?.username === user.username
  );

  const lastUsersIndex = (joinedRoom?.users.length || 0) - 2;

  return (
    <CardContainer
      index={index}
      userNumber={userNumber}
      lastUsersIndex={lastUsersIndex}
    >
      <OpponentName>{playerData?.username}</OpponentName>
      <OpponentLife>{playerData?.life}</OpponentLife>
    </CardContainer>
  );
}

export default OpponentCard;
