import store from "../db/index";
import { Player, Room } from "../classes";
import { TRoom, TUser } from "../types";
import { getRoomsDataObj } from "../lib/helpers";
import { IBasicSocketRequest } from "../types/index";
const { rooms, users } = store;

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

const join = (io: any, socket: any, roomName: string, user: TUser) => {
	if (!roomName || !user) return;

	rooms[roomName].users.forEach((u: TUser) => {
		user.commanderDamage[`${u.username}`] =
			user.commanderDamage[`${u.username}`] || 0;
		u.commanderDamage[`${user.username}`] = 0;
	});
	rooms[roomName].users.push(user);
	users[socket.id] = roomName;
	socket.join(roomName);
	io.to(user.socketID).emit("roomJoined", user);
	io.to(user.socketID).emit("roomData", rooms[roomName]);
};
const kick = (io: any, socket: any, roomName: string, user: TUser) => {
	if (!roomName || !user || !rooms[roomName]) return;
	rooms[roomName].users.forEach(
		(user: TUser) => delete user.commanderDamage[user.username]
	);

	rooms[roomName].users = rooms[roomName].users.filter(
		(u: TUser) => u.socketID !== user.socketID
	);
	delete users[socket.id];
	io.to(rooms[roomName].name).emit("roomData", rooms[roomName]);
	io.to(user.socketID).emit("got kicked");
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
};

export const createRoom = async (
	io: any,
	socket: any,
	{ roomName, maxPlayers, username, startingLife = 40 }: ICreateRoomObj
) => {
	if (!roomName || !maxPlayers || !username) return;
	if (rooms[roomName]) {
		io.to(socket.id).emit("message", "Room name already taken");
		return;
	}
	const user = new Player(username, roomName, startingLife, socket.id);
	const newRoom = new Room(roomName, [], maxPlayers, "");
	rooms[roomName] = newRoom;
	socket.join(roomName);
	join(io, socket, roomName, user);
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
};

export const joinRoom = async (
	io: any,
	socket: any,
	{ roomName, username, startingLife = 40 }: IJoinRoomObj
) => {
	if (!roomName || !username) return;

	if (!rooms[roomName]) {
		io.to(socket.id).emit("message", "This room does not exist anymore");
		return null;
	}
	const roomIsFull =
		rooms[roomName].users.length >= rooms[roomName].maxPlayers!;

	const user = new Player(username, roomName, startingLife, socket.id);

	let alreadyLoggedUser = rooms[roomName].users.find(
		(user: TUser) => user.username === username
	);
	if (!alreadyLoggedUser) {
		if (roomIsFull) {
			io.to(socket.id).emit("message", "Players cap reached");
			return;
		}
		join(io, socket, roomName, user);
	} else {
		if (alreadyLoggedUser.active) {
			io.to(socket.id).emit("message", "This username is taken");
			return;
		}
		//TRANSFER INACTIVE USER DATA TO USER WHO RE JOINED THE SESSION
		user.life = alreadyLoggedUser.life;
		user.commanderDamage = { ...alreadyLoggedUser.commanderDamage };

		await kick(io, socket, roomName, alreadyLoggedUser);
		if (roomIsFull) {
			io.to(socket.id).emit("message", "Players cap reached");
			return;
		}
		await join(io, socket, roomName, user);
	}

	io.emit("updateRoomsData", getRoomsDataObj(rooms));
	io.to(roomName).emit("roomData", rooms[roomName]);
};

export const leaveRoom = (
	io: any,
	socket: any,
	{ roomName, socketID, username }: ILeaveRoomObj
) => {
	if (!roomName || !socketID || !username) return;

	if (!rooms[roomName]) return;
	//CLEAR COMMANDER DAMAGE FOR THE ROOM
	rooms[roomName].users.forEach(
		(user: TUser) => delete user.commanderDamage[username]
	);
	//REMOVE USER FROM ROOM
	rooms[roomName].users = rooms[roomName].users.filter(
		(user: TUser) => user.username !== username
	);
	delete users[socket.id];
	//IF NO USERS LEFT, REMOVE ROOM
	if (rooms[roomName].users.length < 1) {
		delete rooms[roomName];
	}
	io.to(socket.id).emit("leaveRoom");
	socket.leave(roomName);
	io.to(roomName).emit("roomData", rooms[roomName]);
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
};
export const kickPlayer = (
	io: any,
	socket: any,
	{ roomName, socketID, username }: ILeaveRoomObj
) => {
	const requestedUser = rooms[roomName].users.find(
		(user: TUser) => user.socketID === socketID
	);
	kick(io, socket, roomName, requestedUser);
};
