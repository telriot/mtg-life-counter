import React from "react";
import { useAppDispatch } from "../contexts/appContext";
import Button from "./Button";
import Container from "./Container";
import RoomDisplay from "./RoomDisplay";

function LandingScreen() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch({ type: "setActiveTab", payload: 4 });
  };
  return (
    <Container direction="column">
      <Button onClick={handleClick} fullWidth>
        Create a room
      </Button>
      <RoomDisplay />
    </Container>
  );
}

export default LandingScreen;
