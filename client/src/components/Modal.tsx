import React from "react";
import { useAppState } from "../contexts/appContext";
import { useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import Button from "./Button";
import Container from "./Container";
import TextField from "./TextField";

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  width: 100%;
`;
const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 400px;
  max-width: 90%;
  height: 200px;
  max-height: 100%;
  background-color: ${(props) => props.theme.palette.secondary.dark};
  z-index: 11;
`;
const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  roomName: string;
}
function Modal({ isOpen, handleClose, roomName }: IModal) {
  const [username, setUsername] = React.useState("");
  const { activeSocket } = useSocketState();
  const { startingLife } = useAppState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const handleSubmit = () => {
    localStorage.setItem("lifeCounterUsername", username);
    activeSocket.emit("joinRoom", { roomName, username, startingLife });
  };

  React.useEffect(() => {
    const storedUsername = localStorage.getItem("lifeCounterUsername");
    storedUsername && setUsername(storedUsername);
  }, []);

  return (
    <ModalContainer style={!isOpen ? { display: "none" } : {}}>
      <StyledOverlay>
        <StyledModal>
          <Container direction="column" justify="space-around">
            <TextField
              placeholder="username"
              name="username"
              value={username}
              handleChange={handleChange}
            />
            <ButtonDiv>
              <Button onClick={handleClose} width="8rem">
                cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={Boolean(!username || !roomName)}
                width="8rem"
                type="submit"
              >
                Join
              </Button>
            </ButtonDiv>
          </Container>
        </StyledModal>
      </StyledOverlay>
    </ModalContainer>
  );
}

export default Modal;
