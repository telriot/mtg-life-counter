import React from "react";
import styled from "styled-components";
import TextField from "./TextField";
import Button from "./Button";
import { useSocketState } from "../contexts/socketContext";
const Form = styled.form``;
interface ICreateRoomForm {
  handleClose?: () => void;
}

function CreateRoomForm({ handleClose }: ICreateRoomForm) {
  const [username, setUsername] = React.useState("");
  const [roomName, setRoomName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { activeSocket } = useSocketState();

  React.useEffect(() => {
    const storedUsername = localStorage.getItem("lifeCounterUsername");
    console.log(localStorage);
    storedUsername && setUsername(storedUsername);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "roomName":
        setRoomName(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem("lifeCounterUsername", username);
    activeSocket.emit("joinRoom", { roomName, username });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        placeholder="username"
        name="username"
        value={username}
        handleChange={handleChange}
      />
      <TextField
        placeholder="room name"
        name="roomName"
        value={roomName}
        handleChange={handleChange}
      />
      {/* <TextField name="password" value={password} handleChange={handleChange} /> */}
      {/* <Button onClick={handleClose}>Close</Button> */}
      <Button
        disabled={Boolean(!username || !roomName)}
        fullWidth
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}

export default CreateRoomForm;
