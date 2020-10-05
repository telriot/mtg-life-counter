import React from "react";
import { useSocketState, useSocketDispatch } from "../contexts/socketContext";

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
  return (
    <div>
      <button
        disabled={!state.myUserProfile?.username}
        onClick={handleLifeChange(1)}
      >
        +1 life
      </button>
      <button
        disabled={!state.myUserProfile?.username}
        onClick={handleLifeChange(-1)}
      >
        -1 life
      </button>
    </div>
  );
}

export default LifeCounter;
