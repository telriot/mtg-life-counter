import React from "react";
import { useAppDispatch } from "../contexts/appContext";
import styled from "styled-components";
import Container from "./Container";
import CreateRoomForm from "./CreateRoomForm";
import Footer from "./Footer";
const Header = styled.h1`
  margin: 0 0 2rem;
  font-size: 2.5rem;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.text.primary};
  text-align: center;
`;
function CreateRoomScreen() {
  const dispatch = useAppDispatch();

  return (
    <Container direction="column">
      <Header>NEW ROOM</Header>
      <CreateRoomForm />
      <Footer />
    </Container>
  );
}

export default CreateRoomScreen;
