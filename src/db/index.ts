import { TRoom, TUser } from "../types";

const store: {
	rooms: Array<TRoom>;
	users: Array<TUser>;
} = { rooms: [], users: [] };

export { store as default };
