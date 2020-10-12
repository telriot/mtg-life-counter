import store from "../db/index";
import { Player } from "../classes";
import { getRoomsDataObj } from "../lib/helpers";
const { rooms, users } = store;

export const socketDisconnect = (io: any, socket: any) => {
	//FIND USER TO LOG OUT AND RETURN IF NONE
	let loggedOutUser = users.find((user) => user.socketID === socket.id);

	if (!loggedOutUser) {
		console.log("No user to log out");
		return;
	}
	//DEACTIVATE USER
	loggedOutUser.active = false;

	let requestedRoom = rooms.find(
		(room) => room.name === loggedOutUser?.roomName
	);
	//IF ROOM HAS BEEN DELETED, RETURN
	if (!requestedRoom) return;

	let requestedUser = requestedRoom.users.find(
		(user) => user.username === loggedOutUser?.username
	);
	//IF USER HAS BEEN DELETED, RETURN
	if (!requestedUser) return;
	//DEACTIVATE USERS ROOM PROFILE
	requestedUser.active = false;
	//IF USER WAS THE LAST TO LEAVE, DELETE ROOM
	if (requestedRoom.users.length < 2) {
		const userIndex = users.findIndex(
			(user) => user.username === loggedOutUser!.username
		);
		users.splice(userIndex, 1);

		const roomIndex = rooms.findIndex(
			(room) => room.name === requestedRoom?.name
		);
		rooms.splice(roomIndex, 1);
		//EMIT
		io.emit("updateRoomsData", getRoomsDataObj(rooms));
	} else {
		//ELSE IF OTHER USERS ARE IN, START TIMEOUT BEFOR LOGGING OUT
		io.emit("roomData", requestedRoom);

		setTimeout(() => {
			if (!loggedOutUser?.active) {
				const userIndex = users.findIndex(
					(user) => user.username === loggedOutUser!.username
				);
				users.splice(userIndex, 1);

				let requestedRoom = rooms.find(
					(room) => room.name === loggedOutUser?.roomName
				);
				if (!requestedRoom) return;

				const requestedUserRoomIndex = requestedRoom.users.findIndex(
					(user) => user.username === loggedOutUser?.username
				);
				requestedRoom.users.splice(requestedUserRoomIndex, 1);

				requestedRoom.users.forEach(
					(user) =>
						loggedOutUser && delete user.commanderDamage[loggedOutUser.username]
				);
			}
			//EMIT
			io.emit("updateRoomsData", getRoomsDataObj(rooms));
		}, 180000);
	}
};
