import React from "react";
import Button from "./Button";
import Container from "./Container";
import RoomDisplay from "./RoomDisplay";
import Footer from "./Footer";
import { useAppDispatch } from "../contexts/appContext";
function LandingScreen() {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    console.log("clicked");
    dispatch({ type: "setActiveTab", payload: 4 });
  };
  return (
    <Container direction="column">
      <Button onClick={handleClick} fullWidth>
        Create a room
      </Button>
      <RoomDisplay />
      <Footer />
    </Container>
  );
}

export default LandingScreen;
