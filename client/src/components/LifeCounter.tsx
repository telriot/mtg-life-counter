import React from "react";
import { useSocketState, useSocketDispatch } from "../contexts/socketContext";
import styled from "styled-components";
import { Minus, Plus } from "@styled-icons/icomoon";
import Button from "./Button";
import { useAppState } from "../contexts/appContext";

const StyledPlus = styled(Plus)`
  color: inherit;
`;
const StyledMinus = styled(Minus)`
  color: inherit;
`;
const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

function LifeCounter() {
  const dispatch = useSocketDispatch();
  const state = useSocketState();
  const { startingLife } = useAppState();

  const handleLifeChange = (life: number) => async () => {
    dispatch({
      type: "setLifeTotal",
      payload: state.myUserProfile
        ? state.myUserProfile.life + life
        : startingLife,
    });
    state.activeSocket.emit("setLifeTotal", {
      roomName: state.myUserProfile?.roomName,
      socketID: state.activeSocket.id,
      life: state.myUserProfile
        ? state.myUserProfile.life + life
        : startingLife,
      username: state.myUserProfile?.username,
    });
  };

  return (
    <ButtonsDiv>
      <Button onClick={handleLifeChange(-1)} width="80px">
        <StyledMinus size={20} />
      </Button>
      <Button onClick={handleLifeChange(1)} width="80px">
        <StyledPlus size={20} />
      </Button>
    </ButtonsDiv>
  );
}

export default LifeCounter;
