import React from "react";
import { useAppDispatch, useAppState } from "../contexts/appContext";
import styled from "styled-components";
import Button from "./Button";
import Container from "./Container";
import TextField from "./TextField";

const Header = styled.span`
  margin: 0 0 2rem;
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.text.primary};
  text-align: center;
  ${props=>props.theme.breakpoints.down("sm")}{
    font-size:1.5rem;
    margin: 0 0 1rem;
  }
`;
const UsernameDiv = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  ${props=>props.theme.breakpoints.down("sm")}{  margin-bottom: 1rem;
}
`;
const ButtonDiv = styled.div`
  margin-bottom: 1.5rem;
  ${props=>props.theme.breakpoints.down("sm")}{  margin-bottom: 1rem;
}

`;

function PreferencesScreen() {
  const dispatch = useAppDispatch();
  const { startingLife } = useAppState();
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    const storedUsername = localStorage.getItem("lifeCounterUsername");
    storedUsername && setUsername(storedUsername);
  }, []);

  const handleClick = (num: number) => () => {
    dispatch({ type: "setStartingLife", payload: num });
    localStorage.setItem("startingLife", num.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {
    localStorage.setItem("lifeCounterUsername", username);
  };

  const startingTotals = [20, 25, 30, 40];

  return (
    <Container direction="column">
      <UsernameDiv>
        <Header>Your Username</Header>
        <TextField
          placeholder="username"
          name="username"
          value={username}
          handleChange={handleChange}
          margin="0 0 1rem 0"
        />
        <Button disabled={Boolean(!username)} fullWidth onClick={handleSubmit}>
          Update
        </Button>
      </UsernameDiv>

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
    </Container>
  );
}

export default PreferencesScreen;
