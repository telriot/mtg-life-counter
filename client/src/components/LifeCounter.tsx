import React from "react";
import { useSocketState, useSocketDispatch } from "../contexts/socketContext";
import Button from "./Button";
import styled from "styled-components";
import { Minus, Plus } from "@styled-icons/icomoon";

const StyledPlus = styled(Plus)`
  color: inherit;
`;
const StyledMinus = styled(Minus)`
  color: inherit;
`;
function LifeCounter() {
  const dispatch = useSocketDispatch();
  const state = useSocketState();

  const handleLifeChange = (life: number) => async () => {
    dispatch({
      type: "setLifeTotal",
      payload: state.myUserProfile ? state.myUserProfile.life + life : 40,
    });
    state.activeSocket.emit("setLifeTotal", {
      roomName: state.myUserProfile?.roomName,
      socketID: state.activeSocket.id,
      life: state.myUserProfile ? state.myUserProfile.life + life : 40,
      username: state.myUserProfile?.username,
    });
  };
  const ButtonsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 200px;
  `;
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
