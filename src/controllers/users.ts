import store from "../db/index";
import { TRoom } from "../types";
import { getRoomsDataObj } from "../lib/helpers";
import { IBasicSocketRequest } from "../types/index";
const { rooms } = store;

interface ISetLifeTotalObj extends IBasicSocketRequest {
	life: number;
}
interface ISetCommanderDamageObj extends IBasicSocketRequest {
	life: number;
	cmdDmgUsername: string;
	cmdDmgDamage: number;
}

const findRoomAndUser = (
	rooms: Array<TRoom>,
	roomName: string,
	username: string
) => {
	let requestedRoom = rooms.find((room) => room.name === roomName);
	let requestedUser = requestedRoom?.users.find(
		(user) => user.username === username
	);
	return { requestedRoom, requestedUser };
};

export const setLifeTotal = (
	io: any,
	{ roomName, username, life }: ISetLifeTotalObj
) => {
	if (!roomName || !username || !life) return;
	const { requestedRoom, requestedUser } = findRoomAndUser(
		rooms,
		roomName,
		username
	);
	if (!requestedUser || !requestedUser) return;
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
		cmdDmgDamage,
	}: ISetCommanderDamageObj
) => {
	if (!roomName || !username || !cmdDmgUsername || !cmdDmgDamage) return;

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
