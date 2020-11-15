import React from "react";
import Button from "./Button";
import { useSocketState } from "../contexts/socketContext";
import { TUser } from "../types/index";
interface IKickButtonProps {
	opponent?: TUser;
}
function KickButton({ opponent }: IKickButtonProps) {
	const { joinedRoom, activeSocket } = useSocketState();
	const handleClick = () => {
		if (
			window.confirm(`Do you really want to kick ${opponent?.username} out?`)
		) {
			activeSocket.emit("kickPlayer", {
				roomName: joinedRoom?.name,
				socketID: opponent?.socketID,
			});
		}
	};
	return (
		<Button slim onClick={handleClick}>
			Kick
		</Button>
	);
}

export default KickButton;
