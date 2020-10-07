import React from "react";
import LandingScreen from "./components/LandingScreen";
import CreateRoomScreen from "./components/CreateRoomScreen";
import { useAppState } from "./contexts/appContext";
import ActiveRoomScreen from "./components/ActiveRoomScreen";
import PreferencesScreen from "./components/PreferencesScreen";
function App() {
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
