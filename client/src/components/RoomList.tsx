import React from "react";
import { useSocketState } from "../contexts/socketContext";

function RoomList() {
  const state = useSocketState();

  return (
    <div>
      <h4>ROOMS</h4>
      <ul>
        {state.rooms.map(
          (room, i) =>
            room.roomName && (
              <li key={`room-${i}`}>
                {room.roomName}, Users:
                {room.usersLength}
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default RoomList;
