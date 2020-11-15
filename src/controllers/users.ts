import store from "../db/index";
import { getRoomsDataObj } from "../lib/helpers";
import { IBasicSocketRequest } from "../types/index";
import { TUser } from "../../client/src/types";
const { rooms } = store;

interface ISetLifeTotalObj extends IBasicSocketRequest {
	life: number;
}
interface ISetCommanderDamageObj extends IBasicSocketRequest {
	life: number;
	cmdDmgUsername: string;
	cmdDmgDamage: number;
}

const findRoomAndUser = (rooms: any, roomName: string, username: string) => {
	let requestedRoom = rooms[roomName];
	let requestedUser = requestedRoom?.users.find(
		(user: TUser) => user.username === username
	);
	return { requestedRoom, requestedUser };
};

export const setLifeTotal = (
	io: any,
	{ roomName, username, life }: ISetLifeTotalObj
) => {
	if (!roomName || !username) return;

	const { requestedRoom, requestedUser } = findRoomAndUser(
		rooms,
		roomName,
		username
	);
	if (!requestedRoom || !requestedUser) return;
	requestedUser.life = life;

	io.to(roomName).emit("roomData", requestedRoom);
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
};

export const setCommanderDamage = (
	io: any,
	{
		roomName,
		username,
		life,
		cmdDmgUsername,
		cmdDmgDamage = 0,
	}: ISetCommanderDamageObj
) => {
	if (!roomName || !username || !cmdDmgUsername) return;
	console.log(life, cmdDmgDamage);
	const { requestedRoom, requestedUser } = findRoomAndUser(
		rooms,
		roomName,
		username
	);
	if (!requestedRoom || !requestedUser) return;

	requestedUser.commanderDamage[cmdDmgUsername] = cmdDmgDamage;
	requestedUser.life = life;

	io.to(roomName).emit("roomData", requestedRoom);
};

export const resetLifeAndCmdDmg = (
	io: any,
	{ roomName, username, life }: ISetLifeTotalObj
) => {
	const { requestedRoom, requestedUser } = findRoomAndUser(
		rooms,
		roomName,
		username
	);
	if (!requestedRoom || !requestedUser) return;

	let commanderDamageResetObj: any = {};
	Object.keys(requestedUser.commanderDamage).forEach((username) => {
		commanderDamageResetObj[username] = 0;
	});
	requestedUser.commanderDamage = commanderDamageResetObj;
	requestedUser.life = life;
	io.to(roomName).emit("roomData", requestedRoom);
};
