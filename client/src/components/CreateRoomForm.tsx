import React from "react";
import { useAppState } from "../contexts/appContext";
import { useSocketState } from "../contexts/socketContext";
import Button from "./Button";
import TextField from "./TextField";
import MaxPlayersSelect from "./MaxPlayersSelect";

interface ICreateRoomForm {
	handleClose?: () => void;
}

function CreateRoomForm({ handleClose }: ICreateRoomForm) {
	const [username, setUsername] = React.useState("");
	const [roomName, setRoomName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const { activeSocket } = useSocketState();
	const { startingLife, maxPlayers } = useAppState();
	React.useEffect(() => {
		const storedUsername = localStorage.getItem("lifeCounterUsername");
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

	const handleCreate = () => {
		localStorage.setItem("lifeCounterUsername", username);
		activeSocket.emit("createRoom", {
			roomName,
			username,
			startingLife,
			maxPlayers,
		});
	};

	return (
		<div>
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
			<MaxPlayersSelect />
			{/* <TextField name="password" value={password} handleChange={handleChange} /> */}

			<Button
				disabled={Boolean(!username || !roomName)}
				fullWidth
				type="submit"
				onClick={handleCreate}
			>
				Submit
			</Button>
		</div>
	);
}

export default CreateRoomForm;
