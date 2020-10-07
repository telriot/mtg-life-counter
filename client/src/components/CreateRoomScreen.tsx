import React from "react";
import styled from "styled-components";
import Container from "./Container";
import CreateRoomForm from "./CreateRoomForm";

const Header = styled.h1`
  margin: 0 0 2rem;
  color: ${(props) => props.theme.palette.text.primary};
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
`;
function CreateRoomScreen() {
  return (
    <Container direction="column">
      <Header>NEW ROOM</Header>
      <CreateRoomForm />
    </Container>
  );
}

export default CreateRoomScreen;
