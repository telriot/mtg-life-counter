import React from "react";
import { useSocketState, useSocketDispatch } from "../contexts/socketContext";
import LifeCounter from "./LifeCounter";

function ActiveRoom() {
  const dispatch = useSocketDispatch();

  const state = useSocketState();
  const handleLeaveRoom = () => {
    dispatch({ type: "leaveRoom" });
    state.activeSocket.emit("leaveRoom", {
      roomName: state.myUserProfile?.roomName,
      socketID: state.activeSocket.id,
    });
  };
  return (
    <div>
      <h4>JOINED ROOM: {state.myUserProfile?.roomName}</h4>
      {state.joinedRoom?.users.map((user) => (
        <div key={user.socketID}>
          <span>{user.username}</span> is at <span>{user.life}</span>
        </div>
      ))}
      <div>
        <LifeCounter />
        <button
          disabled={!state.myUserProfile?.roomName}
          onClick={handleLeaveRoom}
        >
          Leave Room
        </button>
      </div>
    </div>
  );
}

export default ActiveRoom;
