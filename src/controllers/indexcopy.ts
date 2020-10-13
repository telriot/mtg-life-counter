import store from "../db/index";
import { getRoomsDataObj } from "../lib/helpers";
import { TRoom } from "../../client/src/types";
const { rooms } = store;

export const socketDisconnect = (io: any, socket: any) => {
	const findRoomAndUser = (socketID: string, rooms: Array<TRoom>) => {
		let requestedRoom;
		let requestedRoomIndex;
		let requestedUserIndex;
		for (let room of rooms) {
			let index = 0;
			requestedUserIndex = room.users.findIndex(
				(user) => user.socketID === socketID
			);
			if (requestedUserIndex !== -1) {
				requestedRoom = { ...room };
				requestedRoomIndex = index;
				break;
			}
			index++;
		}
		return {
			requestedRoom,
			requestedRoomIndex,
			requestedUserIndex,
		};
	};

	const {
		requestedRoom,
		requestedRoomIndex,
		requestedUserIndex,
	} = findRoomAndUser(socket.id, rooms);
	if (
		!requestedRoom ||
		requestedUserIndex === -1 ||
		requestedUserIndex === undefined ||
		requestedRoomIndex === -1 ||
		requestedRoomIndex === undefined
	)
		return;

	//DEACTIVATE USERS ROOM PROFILE
	requestedRoom.users[requestedUserIndex].active = false;

	if (requestedRoom.users.length < 2) {
		rooms.splice(requestedRoomIndex, 1);
	} else {
		io.emit("roomData", requestedRoom);
	}
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
};
