import React from "react";
import ActiveRoom from "./components/ActiveRoom";
import CreateRoomForm from "./components/CreateRoomForm";
import LandingScreen from "./components/LandingScreen";
import CreateRoomScreen from "./components/CreateRoomScreen";
import RoomList from "./components/RoomList";
import Rooms from "./components/Rooms";
import { useAppState } from "./contexts/appContext";
import { useSocketState } from "./contexts/socketContext";
import ActiveRoomScreen from "./components/ActiveRoomScreen";
import PreferencesScreen from "./components/PreferencesScreen";
function App() {
  const socketState = useSocketState();
  const { activeTab } = useAppState();
  return (
    <>
      {activeTab === 1 ? (
        <LandingScreen />
      ) : activeTab === 2 ? (
        <PreferencesScreen />
      ) : activeTab === 3 ? (
        <ActiveRoomScreen />
      ) : activeTab === 4 ? (
        <CreateRoomScreen />
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
