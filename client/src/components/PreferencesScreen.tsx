import React from "react";
import Button from "./Button";
import Container from "./Container";
import Footer from "./Footer";
import { useAppDispatch, useAppState } from "../contexts/appContext";
import styled from "styled-components";

const Header = styled.span`
  margin: 0 0 2rem;
  font-size: 2.5rem;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.text.primary};
  text-align: center;
`;
const ButtonDiv = styled.div`
  margin-bottom: 1.5rem;
`;

function PreferencesScreen() {
  const { startingLife } = useAppState();
  const dispatch = useAppDispatch();
  const handleClick = (num: number) => () => {
    console.log("clicked");
    dispatch({ type: "setStartingLife", payload: num });
  };
  const startingTotals = [20, 25, 30, 40];
  return (
    <Container direction="column">
      <Header>Life starts at</Header>
      {startingTotals.map((total) => (
        <ButtonDiv>
          <Button
            key={`starting-total-${total}`}
            onClick={handleClick(total)}
            fullWidth
            highlighted={startingLife === total}
          >
            {total}
          </Button>
        </ButtonDiv>
      ))}

      <Footer />
    </Container>
  );
}

export default PreferencesScreen;
