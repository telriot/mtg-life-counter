import store from "../db/index";
import { Player, Room } from "../classes";
import { TRoom, TUser } from "../types";
import { getRoomsDataObj } from "../lib/helpers";
import { IBasicSocketRequest } from "../types/index";
const { rooms } = store;

interface ICreateRoomObj extends IBasicSocketRequest {
	startingLife?: number;
	maxPlayers: number;
}
interface IJoinRoomObj extends IBasicSocketRequest {
	startingLife?: number;
}
interface ILeaveRoomObj extends IBasicSocketRequest {
	socketID: string;
}

const join = (io: any, socket: any, requestedRoom: TRoom, user: TUser) => {
	requestedRoom.users.forEach((u) => {
		user.commanderDamage[`${u.username}`] =
			user.commanderDamage[`${u.username}`] || 0;
		u.commanderDamage[`${user.username}`] = 0;
	});
	requestedRoom.users.push(user);
	socket.join(requestedRoom.name);
	io.to(user.socketID).emit("roomJoined", user);
	io.to(user.socketID).emit("roomData", requestedRoom);
};
const kick = (io: any, socket: any, requestedRoom: TRoom, user: TUser) => {
	if (!requestedRoom || !user) return;
	requestedRoom.users.forEach(
		(user) => delete user.commanderDamage[user.username]
	);

	requestedRoom.users = requestedRoom.users.filter(
		(u) => u.socketID !== user.socketID
	);

	io.to(requestedRoom.name).emit("roomData", requestedRoom);
	io.to(user.socketID).emit("got kicked");
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
};

export const createRoom = async (
	io: any,
	socket: any,
	{ roomName, maxPlayers, username, startingLife = 40 }: ICreateRoomObj
) => {
	if (!roomName || !maxPlayers || !username) return;
	const requestedRoom = rooms.find((room) => room.name === roomName);
	if (requestedRoom) {
		io.to(socket.id).emit("message", "Room name already taken");
		return;
	}
	const user = new Player(username, roomName, startingLife, socket.id);
	const newRoom = new Room(roomName, [], maxPlayers, "");
	await rooms.push(newRoom);
	socket.join(roomName);
	join(io, socket, newRoom, user);
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
};

export const joinRoom = async (
	io: any,
	socket: any,
	{ roomName, username, startingLife = 40 }: IJoinRoomObj
) => {
	if (!roomName || !username) return;

	let requestedRoom = rooms.find((room) => room.name === roomName);
	if (!requestedRoom) {
		io.to(socket.id).emit("message", "That room has closed down");
		return null;
	}
	const roomIsFull = requestedRoom.users.length >= requestedRoom.maxPlayers!;

	const user = new Player(username, roomName, startingLife, socket.id);

	let alreadyLoggedUser = requestedRoom.users.find(
		(user) => user.username === username
	);
	if (!alreadyLoggedUser) {
		if (roomIsFull) {
			io.to(socket.id).emit("message", "Players cap reached");
			return;
		}
		join(io, socket, requestedRoom, user);
	} else {
		if (alreadyLoggedUser.active) {
			io.to(socket.id).emit("message", "This username is taken");
			return;
		}
		//TRANSFER INACTIVE USER DATA TO USER WHO RE JOINED THE SESSION
		user.life = alreadyLoggedUser.life;
		user.commanderDamage = { ...alreadyLoggedUser.commanderDamage };

		await kick(io, socket, requestedRoom, alreadyLoggedUser);
		if (roomIsFull) {
			io.to(socket.id).emit("message", "Players cap reached");
			return;
		}
		await join(io, socket, requestedRoom, user);
	}

	io.emit("updateRoomsData", getRoomsDataObj(rooms));
	io.to(roomName).emit("roomData", requestedRoom);
};

export const leaveRoom = (
	io: any,
	socket: any,
	{ roomName, socketID, username }: ILeaveRoomObj
) => {
	if (!roomName || !socketID || !username) return;

	let requestedRoom = rooms.find((room) => room.name === roomName);
	if (!requestedRoom) return;
	//CLEAR COMMANDER DAMAGE FOR THE ROOM
	requestedRoom.users.forEach((user) => delete user.commanderDamage[username]);
	//REMOVE USER FROM ROOM
	requestedRoom.users = requestedRoom.users.filter(
		(user) => user.username !== username
	);
	//IF NO USERS LEFT, REMOVE ROOM
	if (requestedRoom.users.length < 1) {
		const roomIndex = rooms.findIndex((room) => room.name === roomName);
		if (roomIndex !== -1) rooms.splice(roomIndex, 1);
	}
	io.to(socket.id).emit("leaveRoom");
	socket.leave(roomName);
	io.to(roomName).emit("roomData", requestedRoom);
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
};
