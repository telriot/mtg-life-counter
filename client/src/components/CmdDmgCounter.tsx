import React, { ButtonHTMLAttributes } from "react";
import { TUser } from "../types";
import { useSocketState, useSocketDispatch } from "../contexts/socketContext";
import { getUserNumber } from "../lib/helpers";
import styled from "styled-components";
import { Minus, Plus } from "@styled-icons/icomoon";

interface ICounterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly userNumber: number;
}
const StyledPlus = styled(Plus)`
  color: inherit;
`;
const StyledMinus = styled(Minus)`
  color: inherit;
`;
const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  height: 7rem;
  width: 5rem;
  padding: 1rem 0.5rem;
  background: ${(props) => props.theme.palette.secondary.main};
  border-radius: 4px;
`;
const CounterButton = styled.button<ICounterButtonProps>`
  background: ${(props) =>
    props.theme.palette.players[`p${props.userNumber}`].main};
  color: ${(props) => props.theme.palette.text.primary};
  padding: 0.625rem 0;
  border: none;
  border-radius: 4px;
  transition: background 0.2s;
  outline-color: ${(props) =>
    props.theme.palette.players[`p${props.userNumber}`].dark};
  cursor: pointer;
  &:hover,
  &:focus {
    background: ${(props) =>
      props.theme.palette.players[`p${props.userNumber}`].dark};
  }
`;
const LifeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
`;
const LifeDisplay = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: ${(props) => props.theme.palette.primary.main};
`;

function CmdDmgCounter({ opponent }: { opponent: TUser }) {
  const dispatch = useSocketDispatch();
  const { myUserProfile, joinedRoom, activeSocket } = useSocketState();

  const handleCmdDmgChange = (damage: number, username: string) => async () => {
    if (!damage || !username || !myUserProfile) return;
    const userCmdDmg = myUserProfile.commanderDamage[username];

    if (damage < 0 && userCmdDmg < 1) {
      return;
    } else {
      dispatch({
        type: "updateCommanderDamage",
        payload: {
          damage: userCmdDmg >= 0 ? userCmdDmg + damage : 0,
          username,
        },
      });
      dispatch({
        type: "setLifeTotal",
        payload: myUserProfile.life - damage,
      });
      activeSocket.emit("setCommanderDamage", {
        roomName: joinedRoom?.name,
        username: myUserProfile.username,
        life: myUserProfile.life - damage,
        cmdDmgUsername: username,
        cmdDmgDamage: userCmdDmg + damage,
      });
    }
  };

  const userNumber = getUserNumber(opponent.username, joinedRoom?.users);
  return (
    <CounterContainer>
      <CounterButton
        onClick={handleCmdDmgChange(1, opponent.username)}
        userNumber={userNumber}
      >
        <StyledPlus size={20} />
      </CounterButton>
      <LifeContainer>
        <LifeDisplay>
          {myUserProfile?.commanderDamage[opponent.username]}
        </LifeDisplay>
      </LifeContainer>
      <CounterButton
        onClick={handleCmdDmgChange(-1, opponent.username)}
        userNumber={userNumber}
      >
        <StyledMinus size={20} />
      </CounterButton>
    </CounterContainer>
  );
}

export default CmdDmgCounter;
