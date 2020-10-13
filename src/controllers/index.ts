import store from "../db/index";
import { getRoomsDataObj } from "../lib/helpers";
import { TRoom, TUser } from "../../client/src/types";
const { rooms, users } = store;

export const socketDisconnect = (io: any, socket: any) => {
	//DEACTIVATE USERS ROOM PROFILE
	const roomName = users[socket.id];
	if (!roomName) {
		console.log("no user found for logout");
		return;
	}
	const requestedRoom = rooms[roomName];
	if (!requestedRoom) {
		console.log("no room found for logout");
		return;
	}
	const requestedUserIndex = rooms[roomName].users.findIndex(
		(user: TUser) => user.socketID === socket.id
	);
	if (!requestedRoom) return;
	requestedRoom.users[requestedUserIndex].active = false;

	if (requestedRoom.users.length < 2) {
		delete rooms[roomName];
	} else {
		io.emit("roomData", requestedRoom);
	}
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
};
