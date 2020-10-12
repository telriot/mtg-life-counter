import { TRoom } from "../types/";
export const getRoomsDataObj = (rooms: Array<TRoom>) =>
	rooms.map((room) => ({
		roomName: room.name,
		usersLength: room.users.length,
		maxPlayers: room.maxPlayers,
	}));
