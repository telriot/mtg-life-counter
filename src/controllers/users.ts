import store from "../db/index";
import { Player } from "../classes";
import { getRoomsDataObj } from "../lib/helpers";
import { IBasicSocketRequest } from "../types/index";
const { rooms, users } = store;

interface ISetLifeTotalObj extends IBasicSocketRequest {
	life: number;
}
interface ISetCommanderDamageObj extends IBasicSocketRequest {
	life: number;
	cmdDmgUsername: string;
	cmdDmgDamage: number;
}
export const setLifeTotal = (
	io: any,
	{ roomName, username, life }: ISetLifeTotalObj
) => {
	if (!roomName || !username || !life) return;

	let requestedRoom = rooms.find((room) => room.name === roomName);
	if (!requestedRoom) return;

	let requestedUser = requestedRoom?.users.find(
		(user) => user.username === username
	);
	if (!requestedUser) return;

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

	let requestedRoom = rooms.find((room) => room.name === roomName);
	if (!requestedRoom) return;
	let requestedUser = requestedRoom?.users.find(
		(user) => user.username === username
	);
	if (!requestedUser) return;

	requestedUser.commanderDamage[cmdDmgUsername] = cmdDmgDamage;
	requestedUser.life = life;

	io.to(roomName).emit("roomData", requestedRoom);
};

export const resetLifeAndCmdDmg = (
	io: any,
	{ roomName, username, life }: ISetLifeTotalObj
) => {
	let requestedRoom = rooms.find((room) => room.name === roomName);
	if (!requestedRoom) return;
	let requestedUser = requestedRoom?.users.find(
		(user) => user.username === username
	);
	if (!requestedUser) return;
	let commanderDamageResetObj: any = {};
	Object.keys(requestedUser.commanderDamage).forEach((username) => {
		commanderDamageResetObj[username] = 0;
	});
	requestedUser.commanderDamage = commanderDamageResetObj;
	requestedUser.life = life;
	io.to(roomName).emit("roomData", requestedRoom);
};
