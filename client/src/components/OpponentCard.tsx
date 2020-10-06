import React from "react";
import styled from "styled-components";
import { TRoom, TUser } from "../types/index";

interface ICardContainerProps {
  readonly userNumber?: number;
}

const CardContainer = styled.div<ICardContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 2px solid
    ${(props) => props.theme.palette.players[`p${props.userNumber}`]};
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
}: {
  playerData?: TUser;
  joinedRoom?: TRoom;
}) {
  const userNumber = joinedRoom?.users.findIndex(
    (user) => playerData?.username === user.username
  );

  return (
    <CardContainer userNumber={userNumber}>
      <OpponentName>{playerData?.username}</OpponentName>
      <OpponentLife>{playerData?.life}</OpponentLife>
    </CardContainer>
  );
}

export default OpponentCard;
