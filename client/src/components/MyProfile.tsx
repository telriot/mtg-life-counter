import React from "react";
import { useSocketState } from "../contexts/socketContext";

function MyProfile() {
  const state = useSocketState();
  return (
    <div>
      <p>Username:{state.myUserProfile?.username}</p>
      <p>Room Joined:{state.myUserProfile?.roomName}</p>
      <p>My Life Total:{state.myUserProfile?.life}</p>
    </div>
  );
}

export default MyProfile;
