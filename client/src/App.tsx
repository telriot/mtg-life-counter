import React from "react";
import ActiveRoom from "./components/ActiveRoom";
import CreateRoomForm from "./components/CreateRoomForm";
import LandingScreen from "./components/LandingScreen";
import RoomList from "./components/RoomList";
import Rooms from "./components/Rooms";
import { useAppState } from "./contexts/appContext";
import { useSocketState } from "./contexts/socketContext";
function App() {
  const socketState = useSocketState();
  const { activeTab } = useAppState();
  return (
    <>
      {activeTab === 1 ? (
        <LandingScreen />
      ) : activeTab === 2 ? (
        <div></div>
      ) : activeTab === 3 ? (
        <div></div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
