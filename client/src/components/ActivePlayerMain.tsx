import React from "react";
import { TUser } from "../types/index";
import { useSocketDispatch, useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import LifeCounter from "./LifeCounter";
import { getUserNumber } from "../lib/helpers";
import { useAppState } from "../contexts/appContext";

interface IHiglightProps {
  userNumber?: number;
}
interface IActivePlayerNameProps {
  active?: boolean;
}
interface IActivePlayerLifeProps {
  active?: boolean;
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
const ActivePlayerName = styled.span<IActivePlayerNameProps>`
  font-family: Roboto;
  font-size: 2.5rem;
  font-weight: 500;
  color: ${(props) =>
    props.active
      ? props.theme.palette.text.primary
      : props.theme.palette.secondary.light};
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
const LifeDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6.25rem;
  min-width: 6.25rem;
  border-radius: 12px;
  background: ${(props) => props.theme.palette.secondary.main};
  outline: none;
  margin: 0.5rem 0;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.palette.secondary.light};
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    height: 7.25rem;
    width: 7.25rem;
  }
`;
const ResetText = styled.span`
  font-family: Roboto;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.text.primary};
  text-transform: uppercase;
`;
const ActivePlayerLife = styled.span<IActivePlayerLifeProps>`
  position: relative;
  font-family: Roboto;
  font-size: 5.5rem;
  font-weight: 500;
  color: ${(props) =>
    props.active
      ? props.theme.palette.text.primary
      : props.theme.palette.secondary.light};
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 4rem;
  }
`;

function ActivePlayerMain() {
  const { joinedRoom, activeSocket, myUserProfile } = useSocketState();
  const dispatch = useSocketDispatch();
  const { startingLife } = useAppState();
  const [resetOpen, setResetOpen] = React.useState(false);
  const handleFocus = () => {
    setResetOpen(true);
  };
  const handleBlur = () => {
    setResetOpen(false);
  };
  const handleClick = () => {
    if (!resetOpen) return;
    // dispatch({
    //   type: "setLifeTotal",
    //   payload: startingLife,
    // });
    dispatch({ type: "resetLifeAndCmdDmg", payload: startingLife });
    activeSocket.emit("resetLifeAndCmdDmg", {
      roomName: joinedRoom?.name,
      username: myUserProfile?.username,
      startingLife,
    });
    // activeSocket.emit("setLifeTotal", {
    //   roomName: myUserProfile?.roomName,
    //   socketID: activeSocket.id,
    //   life: startingLife,
    //   username: myUserProfile?.username,
    // });
    setResetOpen(false);
  };
  return (
    <ActivePlayerContainer>
      <UsernameDiv>
        <ActivePlayerName active={myUserProfile?.active}>
          {myUserProfile?.username}
        </ActivePlayerName>
        <Highlight
          userNumber={getUserNumber(myUserProfile?.username, joinedRoom?.users)}
        />
      </UsernameDiv>
      <LifeDiv
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
      >
        {resetOpen ? (
          <ResetText>reset</ResetText>
        ) : (
          <ActivePlayerLife active={myUserProfile?.active}>
            {myUserProfile?.life}
          </ActivePlayerLife>
        )}
      </LifeDiv>
      <LifeCounter />
    </ActivePlayerContainer>
  );
}

export default ActivePlayerMain;
