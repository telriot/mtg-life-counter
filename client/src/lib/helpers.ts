import { TUser } from "../types/index";
export const getUserNumber = (username?: string, users?: Array<TUser>) => {
	if (!users || !username) return 0;
	const userIndex = users.findIndex((user) => username === user.username);
	return userIndex !== -1 ? userIndex : 4;
};
