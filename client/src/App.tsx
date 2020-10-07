import React from "react";
import LandingScreen from "./components/LandingScreen";
import CreateRoomScreen from "./components/CreateRoomScreen";
import Container from "./components/Container";
import { useAppState } from "./contexts/appContext";
import ActiveRoomScreen from "./components/ActiveRoomScreen";
import PreferencesScreen from "./components/PreferencesScreen";
import Footer from "./components/Footer";
import styled from "styled-components";

const LayoutContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-rows: [header-start]max-content [header-end main-start]1fr[main-end footer-start] max-content[footer-end];
`;
const Box = styled.div`
  grid-row: header-start/footer-start;
`;

function App() {
  const { activeTab } = useAppState();
  return (
    <LayoutContainer>
      <Box>
        <Container maxWidth="md" direction="column" height="100%">
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
        </Container>
      </Box>

      <Footer />
    </LayoutContainer>
  );
}

export default App;
