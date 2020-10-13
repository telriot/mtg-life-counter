import { TRoom, TUser } from "../types";

const store: { rooms: any; users: any } = {
	rooms: {},
	users: {},
};
// const store: {
// 	rooms: Array<TRoom>;
// 	users: Array<TUser>;
// } = { rooms: [], users: [] };

export { store as default };
