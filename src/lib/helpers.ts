import { TRoom } from "../types/";
export const getRoomsDataObj = (rooms: any) =>
	Object.keys(rooms).map((room) => ({
		roomName: rooms[room].name,
		usersLength: rooms[room].users.length,
		maxPlayers: rooms[room].maxPlayers,
	}));

// export const getRoomsDataObj = (rooms: Array<TRoom>) =>
// 	rooms.map((room) => ({
// 		roomName: room.name,
// 		usersLength: room.users.length,
// 		maxPlayers: room.maxPlayers,
// 	}));
