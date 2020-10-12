import { TUser } from "../types";
export class Player {
	username: string;
	life: number;
	active: boolean;
	socketID: string;
	roomName: string;
	commanderDamage: any;

	constructor(
		username: string,
		roomName: string,
		startingLife: number,
		socketID: string
	) {
		(this.username = username),
			(this.life = startingLife),
			(this.active = true),
			(this.socketID = socketID),
			(this.roomName = roomName),
			(this.commanderDamage = {});
	}
}

export class Room {
	//field
	name: string;
	users: Array<TUser>;
	maxPlayers?: number;
	password?: string;

	constructor(
		name: string,
		users: Array<TUser>,
		maxPlayers: number = 5,
		password: string = ""
	) {
		(this.name = name),
			(this.users = users),
			(this.maxPlayers = maxPlayers),
			(this.password = password);
	}
}
