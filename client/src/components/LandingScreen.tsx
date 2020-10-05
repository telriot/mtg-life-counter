import React from "react";
import Button from "./Button";
import Container from "./Container";
import RoomDisplay from "./RoomDisplay";
import Footer from "./Footer";
function LandingScreen() {
  return (
    <Container direction="column">
      <Button fullWidth>Create a room</Button>
      <RoomDisplay />
      <Footer />
    </Container>
  );
}

export default LandingScreen;
