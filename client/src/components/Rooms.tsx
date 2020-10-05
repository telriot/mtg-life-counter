import React from "react";
import { useSocketState, useSocketDispatch } from "../contexts/socketContext";
function Rooms() {
  const dispatch = useSocketDispatch();
  const state = useSocketState();

  const mySocketId = state?.activeSocket?.id;

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
    <>
      <div></div>
    </>
  );
}

export default Rooms;
